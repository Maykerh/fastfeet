import React, { useEffect, useState } from "react";

import api from "../../services/api";

import ContentHeader from "../../components/ContentHeader";
import DataGrid from "../../components/DataGrid";

export default function Orders() {
    const [recipients, setRecipients] = useState([]);
    const [searchText, setSearchText] = useState(null);

    function getFormattedAddress(recipient) {
        const { street, number, city, state } = recipient;

        return `${street}, ${number}, ${city} - ${state}`;
    }

    async function loadData() {
        const response = await api.get("/recipients", { params: { q: searchText } });

        const normalizedData = response.data.map(recipient => ({
            id: recipient.id,
            name: recipient.name,
            address: getFormattedAddress(recipient),
        }));

        setRecipients(normalizedData);
    }

    useEffect(() => {
        loadData();
    }, [searchText]);

    return (
        <div>
            <ContentHeader title={"Gerenciando destinatários"} />
            <DataGrid
                columns={[
                    { field: "id", title: "ID", width: "50px" },
                    { field: "name", title: "Nome", width: "250px" },
                    { field: "address", title: "Endereço" },
                ]}
                data={recipients}
                onSearch={text => {
                    setSearchText(text);
                }}
                onEdit={() => {
                    alert("edit");
                }}
                onDelete={() => {
                    alert("delete");
                }}
            />
        </div>
    );
}
