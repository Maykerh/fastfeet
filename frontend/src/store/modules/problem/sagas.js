import { all, call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";

import history from "../../../services/history";

import api from "../../../services/api";

function* cancelDelivery({ payload }) {
    const { id, callback } = payload;

    try {
        yield call(api.put, `problem/${id}/cancel-delivery`);

        toast.success("Cancelado com sucesso", {});
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

export default all([takeLatest("@recipient/CANCEL_DELIVERY_REQUEST", cancelDelivery)]);
