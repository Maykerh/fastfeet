import React, { useEffect, useState } from "react";

import api from "../../services/api";

import ContentHeader from "../../components/ContentHeader";
import DataGrid from "../../components/DataGrid";

import { Container } from "./styles";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [searchText, setSearchText] = useState(null);

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

    async function loadOrders() {
        const response = await api.get("/orders", { params: { q: searchText } });

        const normalizedData = response.data.map(order => ({
            id: order.id,
            recipient: order.Recipient.name,
            deliveryman: order.Deliveryman.name,
            city: order.Recipient.city,
            state: order.Recipient.state,
            status: getStatus(order),
        }));

        setOrders(normalizedData);
    }

    useEffect(() => {
        loadOrders();
    }, [searchText]);

    return (
        <Container>
            <ContentHeader title={"Gerenciando encomendas"} />
            <DataGrid
                headers={[
                    { field: "id", title: "ID", width: "50px" },
                    { field: "recipient", title: "Destinatário", width: "100%" },
                    { field: "deliveryman", title: "Entregador", width: "100%" },
                    { field: "city", title: "Cidade", width: "100%" },
                    { field: "state", title: "Estado", width: "100%" },
                    { field: "status", title: "Status", width: "100px" },
                ]}
                data={orders}
                onSearch={text => {
                    console.log("foi");
                    setSearchText(text);
                }}
                onView={() => {
                    alert("view");
                }}
                onEdit={() => {
                    alert("edit");
                }}
                onDelete={() => {
                    alert("delete");
                }}
            />
        </Container>
    );
}
