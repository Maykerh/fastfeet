import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import api from "../../services/api";

import ContentHeader from "../../components/ContentHeader";
import DataGrid from "../../components/DataGrid";

import { Container, ContentWrapper } from "./styles";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    // const [page, setPage] = useState(1);
    // const dispatch = useDispatch();

    useEffect(() => {
        async function loadOrders() {
            const response = await api.get("/orders");

            setOrders(response.data);
        }

        CONTINUAR AQUI, TRATAR OS DADOS para exibição E ARRUMAR O HEADER

        loadOrders();
    }, []);

    return (
        <Container>
            <ContentHeader title={"Gerenciando encomendas"} />
            <DataGrid
                headers={[
                    { field: "id", title: "ID", width: "50px" },
                    { field: "createdAt", title: "Destinatário", width: "150px" },
                    { field: "createdAt", title: "Entregador", width: "100%" },
                    { field: "createdAt", title: "Cidade", width: "100%" },
                    { field: "createdAt", title: "Estado", width: "100%" },
                    { field: "createdAt", title: "Status", width: "100%" },
                ]}
                data={orders}
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
