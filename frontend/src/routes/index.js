import React from "react";
import { Switch, Route } from "react-router-dom";

import PrivateRoute from "./privateRoute";

import DefaultLayout from "../components/DefaultLayout";

import Login from "../pages/Login";
import Orders from "../pages/Orders";
import OrdersForm from "../pages/OrdersForm";
import Deliverymans from "../pages/Deliverymans";
import DeliverymansForm from "../pages/DeliverymansForm";
import Recipients from "../pages/Recipients";
import RecipientsForm from "../pages/RecipientsForm";
import Problems from "../pages/Problems";

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Login} />
            <DefaultLayout>
                <PrivateRoute path="/orders" exact component={Orders} />
                <PrivateRoute path="/orders/form" component={OrdersForm} />
                <PrivateRoute path="/deliverymans" exact component={Deliverymans} />
                <PrivateRoute path="/deliverymans/form" component={DeliverymansForm} />
                <PrivateRoute path="/recipients" exact component={Recipients} />
                <PrivateRoute path="/recipients/form" component={RecipientsForm} />
                <PrivateRoute path="/problems" component={Problems} />
            </DefaultLayout>
        </Switch>
    );
}
