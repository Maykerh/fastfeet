import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

import api from "../../services/api";

import ContentHeader from "../../components/ContentHeader";
import DataGrid from "../../components/DataGrid";
import Modal from "../../components/Modal";
import StatusTag from "../../components/StatusTag";

import history from "../../services/history";

import { orderDeleteRequest } from "../../store/modules/order/actions";

import { ModalContent } from "./styles";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrderData, setSelectedOrderData] = useState({});
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState(null);

    const dispatch = useDispatch();

    function getStatus(order) {
        if (order.canceled_at != null) {
            return <StatusTag text={"Cancelada"} color={"#de3d3d"} />;
        }

        if (order.end_date) {
            return <StatusTag text={"Entregue"} color={"#40ad44"} />;
        }

        if (order.start_date) {
            return <StatusTag text={"Em rota"} color={"#4f86ed"} />;
        }

        return <StatusTag text={"Pendente"} color={"#ffbc00"} />;
    }

    function onView(orderData) {
        setIsModalOpen(true);
        setSelectedOrderData(orderData);
    }

    function getViewContent() {
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

    function handleDelete(id) {
        if (!window.confirm("Tem certeza que deseja excluir?")) {
            return;
        }

        dispatch(orderDeleteRequest(id));
    }

    useEffect(() => {
        async function loadData() {
            const response = await api.get("/orders", { params: { q: searchText, page: page } });

            const normalizedData = response.data.map(order => ({
                id: order.id,
                product: order.product,
                recipientName: order.Recipient.name,
                recipient: order.Recipient,
                deliverymanName: order.Deliveryman.name,
                deliveryman: order.Deliveryman,
                city: order.Recipient.city,
                state: order.Recipient.state,
                street: order.Recipient.street,
                start_date: order.start_date,
                end_date: order.end_date,
                canceled_at: order.canceled_at,

                signatureUrl: order.signature ? order.signature.url : null,
            }));

            setOrders(normalizedData);
        }

        loadData();
    }, [page, searchText]);

    return (
        <div>
            <ContentHeader title={"Gerenciando encomendas"} />
            <DataGrid
                columns={[
                    { field: "id", title: "ID", width: "50px" },
                    { field: "product", title: "Produto", width: "100%" },
                    { field: "recipientName", title: "Destinatário", width: "100%" },
                    { field: "deliverymanName", title: "Entregador", width: "100%" },
                    { field: "city", title: "Cidade", width: "100%" },
                    { field: "state", title: "Estado", width: "100%" },
                    { callback: getStatus, title: "Status", width: "100px" },
                ]}
                data={orders}
                onSearch={(text, page) => {
                    setPage(page);
                    setSearchText(text);
                }}
                onView={onView}
                onEdit={data => {
                    history.push({ pathname: "/orders/form", state: { order: data } });
                }}
                onDelete={handleDelete}
                onCreate={() => history.push("/orders/form")}
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
