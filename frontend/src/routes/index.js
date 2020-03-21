import React from "react";
import { Switch, Route } from "react-router-dom";

import PrivateRoute from "./privateRoute";

import Login from "../pages/Login";
import Orders from "../pages/Orders";

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Login} />
            <PrivateRoute path="/orders" component={Orders} />
        </Switch>
    );
}
