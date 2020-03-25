import React from "react";
import PropTypes from "prop-types";

import { MdVisibility, MdEdit, MdDeleteForever } from "react-icons/md";

import { ActionPopover } from "./styles";

export default function Popover({ rowData, onView, onEdit, onDelete, onCancel }) {
    const viewOption = (
        <div onClick={() => onView(rowData)}>
            <MdVisibility size={20} color="#7e42e6" /> <span>Visualizar</span>
        </div>
    );

    const editOption = (
        <div onClick={() => onEdit(rowData)}>
            <MdEdit size={20} color="#4d86ff" /> <span>Editar</span>
        </div>
    );

    const deleteOption = (
        <div onClick={() => onEdit(rowData)}>
            <MdDeleteForever size={20} color="#de3b33" /> <span>Excluir</span>
        </div>
    );

    const cancelOption = (
        <div onClick={() => onCancel(rowData)}>
            <MdDeleteForever size={20} color="#de3b33" /> <span>Cancelar</span>
        </div>
    );

    return (
        <ActionPopover>
            {onView && viewOption}
            {onEdit && editOption}
            {onDelete && deleteOption}
            {onCancel && cancelOption}
        </ActionPopover>
    );
}

Popover.defaultProps = {
    onView: null,
    onEdit: null,
    onDelete: null,
    onCancel: null,
};

Popover.propTypes = {
    rowData: PropTypes.object.isRequired,
    onView: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onCancel: PropTypes.func,
};
