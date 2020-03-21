import { all, call, put, takeLatest } from "redux-saga/effects";
import { signInSuccess, signFailure } from "./actions";
import { toast } from "react-toastify";

import api from "../../../services/api";
import history from "../../../services/history";

export function* signIn({ payload }) {
    try {
        const { email, password } = payload;

        const session = yield call(api.post, "session", {
            email,
            password,
        });

        console.log("voltou");
        console.log(session);

        api.defaults.headers.Authorization = `Bearer ${session.data.token}`;
        console.log("voltou2");

        yield put(signInSuccess(session.data.token));
        console.log("voltou3");
        history.push("/orders");
    } catch (err) {
        console.log(err);
        toast.error("Falha na autenticação");

        yield put(signFailure());
    }
}

export default all([takeLatest("@auth/SIGN_IN_REQUEST", signIn)]);
