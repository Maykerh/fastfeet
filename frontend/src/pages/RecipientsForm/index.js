import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { MdChevronLeft, MdCheck } from "react-icons/md";
import { Form } from "@rocketseat/unform";
import * as Yup from "yup";

import { Container, HeaderWrapper, FormWrapper } from "./styles";

import {
    recipientRegisterRequest,
    recipientUpdateRequest,
} from "../../store/modules/recipient/actions";

import ContentHeader from "../../components/ContentHeader";
import Button from "../../components/Button";
import StyledInput from "../../components/StyledInput";

import history from "../../services/history";

const schema = Yup.object().shape({
    name: Yup.string().required(),
    street: Yup.string().required(),
    city: Yup.string().required(),
    state: Yup.string().required(),
    complement: Yup.string().required(),
    number: Yup.number().required(),
    cep: Yup.string().required(),
});

export default function RecipientForm(props) {
    const recipient = props.location.state ? props.location.state.recipient : null;

    const [isLoading, setIsLoading] = useState(false);

    const formRef = useRef(null);
    const dispatch = useDispatch();

    function handleSubmit(data) {
        setIsLoading(true);
        console.log(data);
        if (recipient) {
            data.id = recipient.id;

            dispatch(recipientUpdateRequest(data));
        } else {
            dispatch(recipientRegisterRequest(data));
        }
    }

    return (
        <Container>
            <Form initialData={recipient} onSubmit={handleSubmit} schema={schema}>
                <HeaderWrapper>
                    <ContentHeader title={`${recipient ? "Edição" : "Cadastro"} de entregador`} />
                    <Button
                        text={"Voltar"}
                        Icon={MdChevronLeft}
                        onClick={() => history.push("/recipients")}
                        width={"120px"}
                        color={"#7b7b7b"}
                    />
                    <Button
                        text={isLoading ? "Salvando..." : "Salvar"}
                        Icon={MdCheck}
                        width={"120px"}
                        type={"submit"}
                    />
                </HeaderWrapper>
                <FormWrapper>
                    <StyledInput disabled={isLoading} labelText="Name" name="name" />
                    <div id="second-row">
                        <StyledInput
                            disabled={isLoading}
                            labelText="Rua"
                            name="street"
                            type="text"
                        />
                        <StyledInput
                            disabled={isLoading}
                            labelText="Número"
                            name="number"
                            type="number"
                        />
                        <StyledInput
                            disabled={isLoading}
                            labelText="Complemento"
                            name="complement"
                            type="text"
                        />
                    </div>
                    <div id="third-row">
                        <StyledInput
                            disabled={isLoading}
                            labelText="Cidade"
                            name="city"
                            type="text"
                        />
                        <StyledInput
                            disabled={isLoading}
                            labelText="Estado"
                            name="state"
                            type="text"
                        />
                        <StyledInput
                            disabled={isLoading}
                            labelText="CEP"
                            name="cep"
                            type="text"
                            ref={formRef}
                        />
                    </div>
                </FormWrapper>
            </Form>
        </Container>
    );
}
