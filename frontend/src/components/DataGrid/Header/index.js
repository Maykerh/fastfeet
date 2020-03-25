import React from "react";
import PropTypes from "prop-types";

import { HeaderLine, HeaderColumn } from "./styles";

export default function Header({ columns, hasActions }) {
    const headerColumns = columns.map((column, index) => (
        <HeaderColumn key={index} width={column.width}>
            <span>{column.title}</span>
        </HeaderColumn>
    ));

    if (hasActions) {
        headerColumns.push(
            <HeaderColumn key={"9999"} width={"50px"}>
                <span>{"Ações"}</span>
            </HeaderColumn>
        );
    }

    return (
        <thead>
            <HeaderLine>{headerColumns}</HeaderLine>
        </thead>
    );
}

Header.defaultProps = {
    hasActions: false,
};

Header.propTypes = {
    columns: PropTypes.array.isRequired,
    hasActions: PropTypes.bool,
};
