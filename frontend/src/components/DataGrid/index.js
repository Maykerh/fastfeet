import React, { useState } from "react";
import PropTypes from "prop-types";

import Header from "./Header";
import Line from "./Line";

import Button from "../../components/Button";

import { Container, Controls } from "./styles";

import { MdAdd, MdSearch } from "react-icons/md";

export default function DataGrid({
    data,
    columns,
    onView,
    onEdit,
    onDelete,
    onSearch,
    onCancel,
    onCreate,
    hideControls,
}) {
    const [searchDelay, setSearchDelay] = useState(null);

    function renderLines() {
        return data.map((rowData, index) => (
            <Line
                key={index + Math.random() + rowData[Object.keys(rowData)[0]]}
                columns={columns}
                rowData={rowData}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
                onCancel={onCancel}
            />
        ));
    }

    function handleSearch(searchText) {
        if (searchDelay) {
            clearTimeout(searchDelay);
        }

        setSearchDelay(setTimeout(() => onSearch(searchText), 1000));
    }

    function getControlsCmp() {
        return (
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
                    <Button text={"Cadastrar"} Icon={MdAdd} onClick={onCreate} width={"130px"} />
                </div>
            </Controls>
        );
    }

    const hasActions = !!onView || !!onEdit || !!onDelete || !!onCancel;

    return (
        <Container>
            {hideControls ? null : getControlsCmp()}
            <div>
                <table>
                    <Header columns={columns} hasActions={hasActions} />
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
    onSearch: null,
    onCancel: null,
    onCreate: null,
    hideControls: false,
};

DataGrid.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            field: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            width: PropTypes.string,
            callback: PropTypes.func,
        })
    ).isRequired,
    data: PropTypes.array.isRequired,
    onView: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onSearch: PropTypes.func,
    onCancel: PropTypes.func,
    onCreate: PropTypes.func,
    hideControls: PropTypes.bool,
};
