import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import api from "../../services/api";

import ContentHeader from "../../components/ContentHeader";
import DataGrid from "../../components/DataGrid";
import Avatar from "../../components/Avatar";

import history from "../../services/history";

import { deliverymanDeleteRequest } from "../../store/modules/deliveryman/actions";

export default function Deliverymans() {
    const [deliverymans, setDeliverymans] = useState([]);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState(null);

    const dispatch = useDispatch();

    function handleDelete(id) {
        if (!window.confirm("Tem certeza que deseja excluir?")) {
            return;
        }

        dispatch(deliverymanDeleteRequest(id));
    }

    function getImage(rowData) {
        return (
            <Avatar url={rowData.avatar} width={"33px"} height={"33px"} userName={rowData.name} />
        );
    }

    useEffect(() => {
        async function loadData() {
            const response = await api.get("/deliveryman", {
                params: { q: searchText, page: page },
            });

            const normalizedData = response.data.map(deliveryman => ({
                id: deliveryman.id,
                avatar: deliveryman.avatar ? deliveryman.avatar.url : null,
                avatar_id: deliveryman.avatar ? deliveryman.avatar.id : null,
                name: deliveryman.name,
                email: deliveryman.email,
            }));

            setDeliverymans(normalizedData);
        }

        loadData();
    }, [page, searchText]);

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
                onSearch={(text, page) => {
                    setPage(page);
                    setSearchText(text);
                }}
                onEdit={data => {
                    history.push({ pathname: "/deliverymans/form", state: { deliveryman: data } });
                }}
                onDelete={handleDelete}
                onCreate={() => history.push("/deliverymans/form")}
            />
        </div>
    );
}
