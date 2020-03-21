import React from "react";
import { Form } from "@rocketseat/unform";

import { Container } from "./styles";
import { useDispatch, useSelector } from "react-redux";

import logo from "../../assets/fastfeet-logo.png";

import { signInRequest } from "../../store/modules/auth/actions";

import StyledInput from "../../components/StyledInput";
import Button from "../../components/Button";

export default function Login() {
    const dispatch = useDispatch();

    function handleSubmit({ email, password }) {
        dispatch(signInRequest(email, password));
    }

    return (
        <Container>
            <div>
                <div>
                    <img src={logo} alt="FastFeet" />
                </div>
                <Form onSubmit={handleSubmit}>
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
                        text={"Entrar no sistema"}
                        width={"100%"}
                        type={"submit"}
                    />
                </Form>
            </div>
        </Container>
    );
}
