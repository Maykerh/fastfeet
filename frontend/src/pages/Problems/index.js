import React, { useEffect, useState } from "react";

import api from "../../services/api";

import ContentHeader from "../../components/ContentHeader";
import DataGrid from "../../components/DataGrid";

export default function Orders() {
    const [problems, setProblems] = useState([]);

    async function loadData() {
        const response = await api.get("/delivery/problems");
        const normalizedData = [];

        response.data.forEach(order => {
            order.problems.forEach(problem => {
                normalizedData.push({
                    orderId: order.id,
                    id: problem.id,
                    problem: problem.description,
                });
            });
        });

        setProblems(normalizedData);
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            <ContentHeader title={"Problemas na entrega"} />
            <DataGrid
                columns={[
                    { field: "orderId", title: "Encomenda", width: "150px" },
                    { field: "problem", title: "Problema" },
                ]}
                data={problems}
                onCancel={() => {
                    alert("cancelou");
                }}
                onView={() => {
                    alert("edit");
                }}
                hideControls
            />
        </div>
    );
}
