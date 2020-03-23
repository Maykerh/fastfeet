import React, { useState } from "react";
import PropTypes from "prop-types";

import Header from "./Header";
import Line from "./Line";

import Button from "../../components/Button";

import { Container, Controls } from "./styles";

import {
    MdAdd,
    MdSearch,
    // MdVisibility,
    // MdEdit,
    // MdDeleteForever,
    // MdRefresh,
} from "react-icons/md";

export default function DataGrid({ data, headers, onView, onEdit, onDelete, onSearch }) {
    const [searchDelay, setSearchDelay] = useState(null);

    function hasActions() {
        return onView || onEdit || onDelete;
    }

    function renderLines() {
        return data.map(rowData => (
            <Line headers={headers} rowData={rowData} onView={onView} onEdit={onEdit} onDelete={onDelete} />
        ));
    }

    function handleSearch(searchText) {
        if (searchDelay) {
            clearTimeout(searchDelay);
        }

        setSearchDelay(setTimeout(() => onSearch(searchText), 1000));
    }

    return (
        <Container>
            <Controls>
                <div>
                    <MdSearch size={20} color="#999999" />
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Busca por encomendas"
                        onChange={e => {
                            handleSearch(e.target.value);
                        }}
                    />
                </div>
                <div>
                    <Button
                        text={"Cadastrar"}
                        Icon={MdAdd}
                        onClick={() => {
                            alert("a");
                        }}
                        width={"130px"}
                    />
                </div>
            </Controls>
            <div>
                <table>
                    <Header headers={headers} hasActions={hasActions()} />
                    {renderLines()}
                </table>
            </div>
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
    onSearch: PropTypes.func.isRequired,
};
