import React from "react";
import PropTypes from "prop-types";

import { HeaderLine, HeaderColumn } from "./styles";

export default function Header({ headers, hasActions }) {
    const headerColumns = headers.map(header => (
        <HeaderColumn width={header.width ? header.width : "100%"}>
            <span>{header.title}</span>
        </HeaderColumn>
    ));

    if (hasActions) {
        headerColumns.push(
            <HeaderColumn width={"50px"}>
                <span>{"Ações"}</span>
            </HeaderColumn>
        );
    }

    return <HeaderLine>{headerColumns}</HeaderLine>;
}

Header.defaultProps = {
    hasActions: false,
};

Header.propTypes = {
    headers: PropTypes.array.isRequired,
    hasActions: PropTypes.bool,
};
