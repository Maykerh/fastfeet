import { all, call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";

import history from "../../../services/history";

import api from "../../../services/api";

function* recipientRegister({ payload }) {
    try {
        const { name, street, number, complement, city, state, cep } = payload;

        yield call(api.post, "recipients", {
            name,
            street,
            number,
            complement,
            city,
            state,
            cep,
        });

        toast.success("Salvo com sucesso");

        history.push("/recipients");
    } catch (err) {
        if (err.response.data.error) {
            toast.error(err.response.data.error);
        } else {
            console.warn(err);
        }
    }
}

function* recipientUpdate({ payload }) {
    try {
        const { id, name, street, number, complement, city, state, cep } = payload;

        yield call(api.put, `recipients/${id}`, {
            name,
            street,
            number,
            complement,
            city,
            state,
            cep,
        });

        toast.success("Atualizado com sucesso", {});

        history.push("/recipients");
    } catch (err) {
        if (err.response.data.error) {
            toast.error(err.response.data.error);
        } else {
            console.warn(err);
        }
    }
}

function* recipientDelete({ payload }) {
    const { id, callback } = payload;

    try {
        yield call(api.delete, `recipients/${id}`);

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
    takeLatest("@recipient/REGISTER_REQUEST", recipientRegister),
    takeLatest("@recipient/UPDATE_REQUEST", recipientUpdate),
    takeLatest("@recipient/DELETE_REQUEST", recipientDelete),
]);
