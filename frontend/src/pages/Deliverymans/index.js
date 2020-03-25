import React, { useEffect, useState } from "react";

import api from "../../services/api";

import ContentHeader from "../../components/ContentHeader";
import DataGrid from "../../components/DataGrid";
import Avatar from "../../components/Avatar";

export default function Orders() {
    const [deliverymans, setDeliverymans] = useState([]);
    const [searchText, setSearchText] = useState(null);

    async function loadData() {
        const response = await api.get("/deliveryman", { params: { q: searchText } });

        const normalizedData = response.data.map(deliveryman => ({
            id: deliveryman.id,
            image: deliveryman.avatar ? deliveryman.avatar.url : null,
            name: deliveryman.name,
            email: deliveryman.email,
        }));

        setDeliverymans(normalizedData);
    }

    function getImage(rowData) {
        return (
            <Avatar url={rowData.image} width={"33px"} height={"33px"} userName={rowData.name} />
        );
    }

    useEffect(() => {
        loadData();
    }, [searchText]);

    return (
        <div>
            <ContentHeader title={"Gerenciando entregadores"} />
            <DataGrid
                columns={[
                    { field: "id", title: "ID", width: "50px" },
                    { field: "image", title: "Foto", callback: getImage, width: "100px" },
                    { field: "name", title: "Nome", width: "250px" },
                    { field: "email", title: "Email", width: "100%" },
                ]}
                data={deliverymans}
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
