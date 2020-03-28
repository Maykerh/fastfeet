import React from "react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import Routes from "./routes";
import history from "./services/history";
import api from "./services/api";
import store from "./store";

import GlobalStyle from "./styles/global";

const storedData = JSON.parse(localStorage.getItem("fastfeet"));

if (storedData) {
    api.defaults.headers.Authorization = `Bearer ${storedData.token}`;

    store.dispatch({ type: "@auth/SIGN_IN_SUCCESS", payload: storedData });
}

function App() {
    return (
        <Provider store={store}>
            <Router history={history}>
                <Routes />
                <GlobalStyle />
                <ToastContainer autoClose={1500} />
            </Router>
        </Provider>
    );
}

export default App;
