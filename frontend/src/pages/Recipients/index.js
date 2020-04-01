import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import api from "../../services/api";
import history from "../../services/history";

import ContentHeader from "../../components/ContentHeader";
import DataGrid from "../../components/DataGrid";

import { recipientDeleteRequest } from "../../store/modules/recipient/actions";

export default function Orders() {
    const [recipients, setRecipients] = useState([]);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState(null);

    const dispatch = useDispatch();

    function getFormattedAddress(recipient) {
        const { street, number, city, state } = recipient;

        return `${street}, ${number}, ${city} - ${state}`;
    }

    async function loadData() {
        const response = await api.get("/recipients", { params: { q: searchText, page: page } });

        const normalizedData = response.data.map(recipient => ({
            id: recipient.id,
            name: recipient.name,
            address: getFormattedAddress(recipient),
            street: recipient.street,
            number: recipient.number,
            state: recipient.state,
            city: recipient.city,
            cep: recipient.cep,
            complement: recipient.complement,
        }));

        setRecipients(normalizedData);
    }

    useEffect(() => {
        loadData();
    }, [page, searchText]);

    function handleDelete(id) {
        if (!window.confirm("Tem certeza que deseja excluir?")) {
            return;
        }

        dispatch(recipientDeleteRequest(id, loadData));
    }

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
                onSearch={(text, page) => {
                    setPage(page);
                    setSearchText(text);
                }}
                onEdit={data => {
                    history.push({ pathname: "/recipients/form", state: { recipient: data } });
                }}
                onDelete={handleDelete}
                onCreate={() => history.push("/recipients/form")}
            />
        </div>
    );
}
