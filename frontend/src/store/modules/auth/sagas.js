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

        api.defaults.headers.Authorization = `Bearer ${session.data.token}`;

        yield put(signInSuccess(session.data.token, email, session.data.user));
        history.push("/orders");
    } catch (err) {
        toast.error("Falha na autenticação");

        yield put(signFailure());
    }
}

export function* logout() {
    history.push("/");
}

export default all([
    takeLatest("@auth/SIGN_IN_REQUEST", signIn),
    takeLatest("@auth/LOGOUT", logout),
]);
