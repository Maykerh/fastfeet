import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import api from "../../services/api";

import ContentHeader from "../../components/ContentHeader";
import DataGrid from "../../components/DataGrid";
import Modal from "../../components/Modal";

import { ModalContent } from "./styles";

import { cancelDeliveryRequest } from "../../store/modules/problem/actions";

export default function Problems() {
    const [problems, setProblems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProblemData, setSelectedProblemData] = useState({});
    const [page, setPage] = useState(1);

    const dispatch = useDispatch();

    function normalizeDescription(description) {
        if (!description || description.length < 120) {
            return description;
        }

        const newDescription = description.substr(0, 120);

        return newDescription + "...";
    }

    function onView(problemData) {
        setIsModalOpen(true);
        setSelectedProblemData(problemData);
    }

    function getViewContent() {
        const { problem } = selectedProblemData;

        return (
            <ModalContent>
                <p>
                    <strong>Detalhes do problema</strong>
                </p>
                <p>{problem}</p>
            </ModalContent>
        );
    }

    function handleCancel(problemData) {
        if (problemData.order_canceled_at != null) {
            toast.info("Pedido já cancelado", {});
            return;
        }

        if (!window.confirm("Tem certeza que deseja cancelar o pedido?")) {
            return;
        }

        dispatch(cancelDeliveryRequest(problemData.id));
    }

    useEffect(() => {
        async function loadData() {
            const response = await api.get("/delivery/problems", { params: { page: page } });

            const normalizedData = response.data.map(problem => ({
                orderId: problem.delivery_id,
                id: problem.id,
                description: normalizeDescription(problem.description),
                order_canceled_at: problem.Order.canceled_at,
            }));

            setProblems(normalizedData);
        }

        loadData();
    }, [page, setPage]);

    return (
        <div>
            <ContentHeader title={"Problemas na entrega"} />
            <DataGrid
                columns={[
                    { field: "orderId", title: "Pedido", width: "150px" },
                    { field: "description", title: "Problema" },
                ]}
                onSearch={(_, page) => {
                    setPage(page);
                }}
                data={problems}
                onCancel={handleCancel}
                onView={onView}
                hideControls
            />
            <Modal
                getContent={getViewContent}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                width={400}
                height={360}
            />
        </div>
    );
}
