import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import api from "../../services/api";
import { useDispatch } from "react-redux";
import { MdChevronLeft, MdCheck } from "react-icons/md";
import { Form } from "@rocketseat/unform";
import * as Yup from "yup";
import { toast } from "react-toastify";

import { Container, HeaderWrapper, FormWrapper, SelectWrapper, Label } from "./styles";

import { orderRegisterRequest, orderUpdateRequest } from "../../store/modules/order/actions";

import ContentHeader from "../../components/ContentHeader";
import Button from "../../components/Button";
import StyledInput from "../../components/StyledInput";

import history from "../../services/history";

const schema = Yup.object().shape({
    product: Yup.string()
        .max(255)
        .required(),
});

export default function OrdersForm(props) {
    const order = props.location.state ? props.location.state.order : null;

    const [isLoading, setIsLoading] = useState(false);
    const [recipient_id, setRecipientId] = useState(order ? order.recipient.id : null);
    const [deliveryman_id, setDeliverymanId] = useState(order ? order.deliveryman.id : null);

    const dispatch = useDispatch();

    function handleSubmit(data) {
        if (!deliveryman_id) {
            toast.error("Nenhum entregador informado");
            return;
        }

        if (!recipient_id) {
            toast.error("Nenhum destinatário informado");
            return;
        }

        setIsLoading(true);

        data.recipient_id = recipient_id;
        data.deliveryman_id = deliveryman_id;

        if (order) {
            data.id = order.id;

            dispatch(orderUpdateRequest(data));
        } else {
            dispatch(orderRegisterRequest(data));
        }
    }

    async function loadDeliverymans(search) {
        const deliverymans = await api.get(`/deliveryman`, { params: { q: search } });

        return deliverymans.data.map(deliveryman => {
            return {
                value: deliveryman.id,
                label: deliveryman.name,
            };
        });
    }

    async function loadRecipients(search) {
        const recipients = await api.get(`/recipients`, { params: { q: search } });

        return recipients.data.map(recipient => {
            return {
                value: recipient.id,
                label: recipient.name,
            };
        });
    }

    return (
        <Container>
            <Form initialData={order} onSubmit={handleSubmit} schema={schema}>
                <HeaderWrapper>
                    <ContentHeader title={`${order ? "Edição" : "Cadastro"} de encomenda`} />
                    <Button
                        text={"Voltar"}
                        Icon={MdChevronLeft}
                        onClick={() => history.push("/orders")}
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
                    <SelectWrapper>
                        <Label htmlFor={"deliveryman"}>{"Entregador"}</Label>
                        <AsyncSelect
                            isSearchable
                            defaultOptions
                            defaultValue={{
                                label: order ? order.deliveryman.name : "",
                                value: order ? order.deliveryman.id : "",
                            }}
                            loadOptions={search => loadDeliverymans(search)}
                            onChange={selected => setDeliverymanId(selected.value)}
                            name="deliveryman"
                        />
                    </SelectWrapper>
                    <SelectWrapper>
                        <Label htmlFor={"recipient"}>{"Destinatário"}</Label>
                        <AsyncSelect
                            isSearchable
                            defaultOptions
                            defaultValue={{
                                label: order ? order.recipient.name : "",
                                value: order ? order.recipient.id : "",
                            }}
                            loadOptions={search => loadRecipients(search)}
                            onChange={selected => setRecipientId(selected.value)}
                            name="recipient"
                        />
                    </SelectWrapper>
                    <StyledInput disabled={isLoading} labelText="Nome do produto" name="product" />
                </FormWrapper>
            </Form>
        </Container>
    );
}
