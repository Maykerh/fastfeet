import React, { useState } from "react";
import api from "../../services/api";
import { useDispatch } from "react-redux";
import { MdChevronLeft, MdCheck } from "react-icons/md";
import { FaCamera } from "react-icons/fa";
import { Form } from "@rocketseat/unform";
import * as Yup from "yup";

import { Container, HeaderWrapper, FormWrapper, ImageInput } from "./styles";

import {
    deliverymanRegisterRequest,
    deliverymanUpdateRequest,
} from "../../store/modules/deliveryman/actions";

import ContentHeader from "../../components/ContentHeader";
import Button from "../../components/Button";
import StyledInput from "../../components/StyledInput";

import history from "../../services/history";

const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string()
        .email()
        .required(),
});

export default function DeliverymansForm(props) {
    const deliveryman = props.location.state ? props.location.state.deliveryman : null;

    const [file, setFile] = useState(deliveryman && deliveryman.avatar_id);
    const [preview, setPreview] = useState(deliveryman && deliveryman.avatar);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    function getImgComponent() {
        return <img src={preview} alt={""} />;
    }

    function getUploadComponent() {
        return (
            <div id={"upload-component"}>
                <FaCamera size={"50px"} />
                <span>{"Adicionar foto"}</span>
            </div>
        );
    }

    async function handleChangeImage(e) {
        const data = new FormData();

        data.append("file", e.target.files[0]);

        const response = await api.post("files", data);

        const { id, url } = response.data;

        setFile(id);
        setPreview(url);
    }

    function handleSubmit(data) {
        setIsLoading(true);
        data.avatar_id = file;

        if (deliveryman) {
            data.id = deliveryman.id;

            dispatch(deliverymanUpdateRequest(data));
        } else {
            dispatch(deliverymanRegisterRequest(data));
        }
    }

    return (
        <Container>
            <Form initialData={deliveryman} onSubmit={handleSubmit} schema={schema}>
                <HeaderWrapper>
                    <ContentHeader title={`${deliveryman ? "Edição" : "Cadastro"} de entregador`} />
                    <Button
                        text={"Voltar"}
                        Icon={MdChevronLeft}
                        onClick={() => history.push("/deliverymans")}
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
                    <ImageInput>
                        <label htmlFor={"avatar"}>
                            {preview ? getImgComponent() : getUploadComponent()}

                            <input
                                type={"file"}
                                id={"avatar"}
                                accept={"image/*"}
                                data-file={file || null}
                                onChange={handleChangeImage}
                            />
                        </label>
                    </ImageInput>
                    <StyledInput disabled={isLoading} labelText="Nome" name="name" />
                    <StyledInput disabled={isLoading} labelText="Email" name="email" type="email" />
                </FormWrapper>
            </Form>
        </Container>
    );
}
