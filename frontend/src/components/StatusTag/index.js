import React from "react";

import { Container } from "./styles";

export default function StatusTag({ text, color }) {
    return (
        <Container color={color}>
            <div />
            <span>{text}</span>
        </Container>
    );
}
