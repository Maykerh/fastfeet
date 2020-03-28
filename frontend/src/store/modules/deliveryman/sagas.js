import { all, call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";

// import { meetupRegisterSuccess } from "./actions";

import history from "../../../services/history";

import api from "../../../services/api";

function* deliverymanRegister({ payload }) {
    alert("foiss");
    try {
        const { avatar_id, name, email } = payload.data;

        yield call(api.post, "deliveryman", {
            avatar_id,
            name,
            email,
        });

        toast.success("Salvo com sucesso");
    } catch (err) {
        if (err.response.data.error) {
            toast.error(err.response.data.error);
        } else {
            console.warn(err);
        }
    }
}

function* deliverymanUpdate({ payload }) {
    try {
        const { avatar_id, name, email, id } = payload;

        yield call(api.put, `deliveryman/${id}`, {
            avatar_id,
            name,
            email,
        });

        toast.success("Atualizado com sucesso", {});
    } catch (err) {
        if (err.response.data.error) {
            toast.error(err.response.data.error);
        } else {
            console.warn(err);
        }
    }
}

export default all([
    takeLatest("@deliveryman/REGISTER_REQUEST", deliverymanRegister),
    takeLatest("@deliveryman/UPDATE_REQUEST", deliverymanUpdate),
]);
