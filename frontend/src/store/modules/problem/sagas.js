import { all, call, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";

import history from "../../../services/history";

import api from "../../../services/api";

function* cancelDelivery({ payload }) {
    try {
        yield call(api.put, `problem/${payload}/cancel-delivery`);

        toast.success("Cancelado com sucesso", {});

        history.push("/refresh");
        history.goBack();
    } catch (err) {
        if (err.response.data.error) {
            toast.error(err.response.data.error);
        } else {
            console.warn(err);
        }
    }
}

export default all([takeLatest("@recipient/CANCEL_DELIVERY_REQUEST", cancelDelivery)]);
