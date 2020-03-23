import React from "react";

import ContentHeader from "../../components/ContentHeader";
import DataGrid from "../../components/DataGrid";

import { Container } from "./styles";

export default function Orders() {
    return (
        <Container>
            <ContentHeader title={"Gerenciando encomendas"} />
            <DataGrid
                headers={[
                    { field: "id", title: "ID", width: "50px" },
                    { field: "name", title: "Name", width: "150px" },
                    { field: "address", title: "Endereço" },
                ]}
                data={[
                    { id: 1, name: "nome 1", address: "rua bla bla bla" },
                    { id: 2, name: "nome 2", address: "rua bla bla bla 2" },
                ]}
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
