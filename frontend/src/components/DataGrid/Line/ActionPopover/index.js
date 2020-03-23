import React from "react";
import PropTypes from "prop-types";

import { MdVisibility, MdEdit, MdDeleteForever } from "react-icons/md";

import { ActionPopover } from "./styles";

export default function Popover({ id, onView, onEdit, onDelete }) {
    const viewOption = (
        <div onClick={() => onView(id)}>
            <MdVisibility size={20} color="#7e42e6" /> <span>Visualizar</span>
        </div>
    );

    const editOption = (
        <div onClick={() => onEdit(id)}>
            <MdEdit size={20} color="#4d86ff" /> <span>Editar</span>
        </div>
    );

    const deleteOption = (
        <div onClick={() => onEdit(id)}>
            <MdDeleteForever size={20} color="#de3b33" /> <span>Excluir</span>
        </div>
    );
    return (
        <ActionPopover>
            {onView && viewOption}
            {onEdit && editOption}
            {onDelete && deleteOption}
        </ActionPopover>
    );
}

Popover.defaultProps = {
    onView: null,
    onEdit: null,
    onDelete: null,
};

Popover.propTypes = {
    id: PropTypes.number.isRequired,
    onView: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
};
