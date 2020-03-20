import React from "react";
import PropTypes from "prop-types";

import { Container } from "./styles";

const Button = ({ text, width, Icon, color, type, onClick }) => {
    return (
        <Container width={width} color={color} type={type} onClick={onClick}>
            {Icon ? <Icon size={"16px"} /> : null}
            <span>{text}</span>
        </Container>
    );
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    width: PropTypes.string,
    icon: PropTypes.object,
    color: PropTypes.string,
};

export default Button;
