import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "@rocketseat/unform";
import * as Yup from "yup";

import { Container } from "./styles";

import logo from "../../assets/fastfeet-logo.png";

import { signInRequest } from "../../store/modules/auth/actions";

import StyledInput from "../../components/StyledInput";
import Button from "../../components/Button";

const schema = Yup.object().shape({
    email: Yup.string()
        .email()
        .required("Email is required"),
    password: Yup.string()
        .min(6, "Password minimun length is 6")
        .required("Password is required"),
});

export default function Login() {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.loading);

    function handleSubmit({ email, password }) {
        dispatch(signInRequest(email, password));
    }

    return (
        <Container>
            <div>
                <div>
                    <img src={logo} alt="FastFeet" />
                </div>
                <Form schema={schema} onSubmit={handleSubmit}>
                    <div>
                        <StyledInput
                            labelText="SEU E-MAIL"
                            name="email"
                            type="email"
                            placeholder="Seu e-mail"
                        />
                    </div>
                    <div>
                        <StyledInput
                            labelText="SUA SENHA"
                            name="password"
                            type="password"
                            placeholder="Sua senha"
                        />
                    </div>
                    <Button
                        text={loading ? "Carregando..." : "Entrar no sistema"}
                        width={"100%"}
                        type={"submit"}
                    />
                </Form>
            </div>
        </Container>
    );
}
