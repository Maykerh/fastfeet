import React from "react";
import { Form, Input } from "@rocketseat/unform";

import { Container } from "./styles";

import logo from "../../assets/fastfeet-logo.png";

import StyledInput from "../../components/StyledInput";
import Button from "../../components/Button";

export default function Login() {
    function handleSubmit({ email, password }) {
        alert("foi");
        console.log(email, password);
        // dispatch(signUpRequest(name, email, password));
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
