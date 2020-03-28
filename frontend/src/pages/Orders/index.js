import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

import api from "../../services/api";

import ContentHeader from "../../components/ContentHeader";
import DataGrid from "../../components/DataGrid";
import Modal from "../../components/Modal";

import { ModalContent } from "./styles";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [searchText, setSearchText] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrderData, setSelectedOrderData] = useState({});

    function getStatus(order) {
        if (order.canceled_at != null) {
            return "Cancelado";
        }

        if (order.end_date) {
            return "Entregue";
        }

        if (order.start_date) {
            return "Em rota";
        }

        return "Pendente";
    }

    async function loadData() {
        const response = await api.get("/orders", { params: { q: searchText } });

        const normalizedData = response.data.map(order => ({
            id: order.id,
            recipient: order.Recipient.name,
            deliveryman: order.Deliveryman.name,
            city: order.Recipient.city,
            state: order.Recipient.state,
            street: order.Recipient.street,
            start_date: order.start_date,
            end_date: order.end_date,
            status: getStatus(order),
            signatureUrl: order.signature ? order.signature.url : null,
        }));

        setOrders(normalizedData);
    }

    function onView(orderData) {
        setIsModalOpen(true);
        setSelectedOrderData(orderData);
    }

    function getContent() {
        const { street, city, state, signatureUrl, start_date, end_date } = selectedOrderData;

        return (
            <ModalContent>
                <div>
                    <p>
                        <strong>Informações da encomenda</strong>
                    </p>
                    <p>{street}</p>
                    <p>{`${city} - ${state}`}</p>
                    <br />
                    <div id="separator" />
                    <p>
                        <strong>Retirada:</strong>{" "}
                        {start_date
                            ? format(new Date(start_date), "dd/MM/yyyy", {
                                  locale: pt,
                              })
                            : ""}
                    </p>
                    <p>
                        <strong>Entrega:</strong>{" "}
                        {end_date
                            ? format(new Date(end_date), "dd/MM/yyyy", {
                                  locale: pt,
                              })
                            : ""}
                    </p>
                </div>
                <div>
                    <p>
                        <strong>Assinatura do Destinatário</strong>
                    </p>
                    <div>{signatureUrl && <img src={signatureUrl} alt="Assinatura" />}</div>
                </div>
            </ModalContent>
        );
    }

    useEffect(() => {
        loadData();
    }, [searchText]);

    return (
        <div>
            <ContentHeader title={"Gerenciando encomendas"} />
            <DataGrid
                columns={[
                    { field: "id", title: "ID", width: "50px" },
                    { field: "recipient", title: "Destinatário", width: "100%" },
                    { field: "deliveryman", title: "Entregador", width: "100%" },
                    { field: "city", title: "Cidade", width: "100%" },
                    { field: "state", title: "Estado", width: "100%" },
                    { field: "status", title: "Status", width: "100px" },
                ]}
                data={orders}
                onSearch={text => {
                    setSearchText(text);
                }}
                onView={onView}
                onEdit={() => {
                    alert("edit");
                }}
                onDelete={() => {
                    alert("delete");
                }}
            />
            <Modal
                getContent={getContent}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                width={400}
                height={360}
            />
        </div>
    );
}
