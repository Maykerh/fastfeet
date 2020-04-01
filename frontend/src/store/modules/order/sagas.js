import { all, call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";

import history from "../../../services/history";

import api from "../../../services/api";

function* orderRegister({ payload }) {
    try {
        const { recipient_id, deliveryman_id, product } = payload;

        yield call(api.post, "orders", {
            recipient_id,
            deliveryman_id,
            product,
        });

        toast.success("Salvo com sucesso");

        history.push("/orders");
    } catch (err) {
        if (err.response.data.error) {
            toast.error(err.response.data.error);
        } else {
            console.warn(err);
        }
    }
}

function* orderUpdate({ payload }) {
    try {
        const { recipient_id, deliveryman_id, product, id } = payload;

        yield call(api.put, `orders/${id}`, {
            recipient_id,
            deliveryman_id,
            product,
        });

        toast.success("Atualizado com sucesso", {});

        history.push("/orders");
    } catch (err) {
        if (err.response.data.error) {
            toast.error(err.response.data.error);
        } else {
            console.warn(err);
        }
    }
}

function* orderDelete({ payload }) {
    const { id, callback } = payload;

    try {
        yield call(api.delete, `orders/${id}`);

        toast.success("Excluído com sucesso", {});
    } catch (err) {
        if (err.response.data.error) {
            toast.error(err.response.data.error);
        } else {
            console.warn(err);
        }
    } finally {
        callback();
    }
}

export default all([
    takeLatest("@order/REGISTER_REQUEST", orderRegister),
    takeLatest("@order/UPDATE_REQUEST", orderUpdate),
    takeLatest("@order/DELETE_REQUEST", orderDelete),
]);
