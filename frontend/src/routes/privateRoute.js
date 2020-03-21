import React from "react";

import { Route, Redirect } from "react-router-dom";

import store from "../store";

const PrivateRoute = ({ children, ...rest }) => {
    const isSigned = store.getState().auth.signed;

    if (!isSigned) {
        return <Redirect to="/" />;
    }

    return <Route {...rest}>{children}</Route>;
};

export default PrivateRoute;
