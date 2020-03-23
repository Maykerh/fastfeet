import React, { useState } from "react";
import PropTypes from "prop-types";

import Header from "./Header";
import Line from "./Line";

import { Container } from "./styles";

export default function DataGrid({ data, headers, onView, onEdit, onDelete }) {
    function hasActions() {
        return onView || onEdit || onDelete;
    }

    function renderLines() {
        return data.map(rowData => (
            <Line
                headers={headers}
                rowData={rowData}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        ));
    }

    return (
        <Container>
            <Header headers={headers} hasActions={hasActions()} />
            {renderLines()}
        </Container>
    );
}

DataGrid.defaultProps = {
    onView: null,
    onEdit: null,
    onDelete: null,
};

DataGrid.propTypes = {
    headers: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    onView: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
};
