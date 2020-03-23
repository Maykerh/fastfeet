import React from "react";

import { Container, Header } from "./styles";

export default function ContentHeader({ title }) {
    return (
        <Container>
            <Header>{title}</Header>
        </Container>
    );
}
