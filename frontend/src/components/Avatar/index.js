import React from "react";
import PropTypes from "prop-types";

import { Container } from "./styles";

export default function Avatar({ url, width, height, userName }) {
    const urlName = userName.split(" ").join("+");
    const genericImageUrl = `https://ui-avatars.com/api/?name=${urlName}`;

    return (
        <Container width={width} height={height}>
            <img src={url || genericImageUrl} alt="Avatar" />
        </Container>
    );
}

Avatar.defaultProps = {
    userName: "x",
    url: null,
    width: "30px",
    height: "30px",
};

Avatar.propTypes = {
    userName: PropTypes.string,
    url: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
};
