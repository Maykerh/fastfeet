import React, { useState } from "react";
import PropTypes from "prop-types";
import Popover from "react-tiny-popover";

import { MdMoreHoriz } from "react-icons/md";

import ActionPopover from "./ActionPopover";

import { LineWrapper, Column } from "./styles";

function Line({ columns, rowData, onView, onEdit, onDelete, onCancel }) {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const cols = columns.map((column, index) => {
        let columnContent;

        if (typeof column.callback === "function") {
            columnContent = column.callback(rowData);
        } else {
            columnContent = <span>{rowData[column.field] ? rowData[column.field] : ""}</span>;
        }

        return (
            <Column key={column.field + index} width={column.width}>
                {columnContent}
            </Column>
        );
    });

    const hasActions = onView || onEdit || onDelete || onCancel;

    if (hasActions) {
        cols.push(
            <Popover
                key={"99999"}
                isOpen={isPopoverOpen}
                position={"bottom"}
                onClickOutside={() => setIsPopoverOpen(false)}
                content={
                    <ActionPopover
                        rowData={rowData}
                        onView={onView}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onCancel={onCancel}
                    />
                }
            >
                <Column width={"50px"}>
                    <div onClick={() => setIsPopoverOpen(!isPopoverOpen)} id="actions-btn">
                        <MdMoreHoriz size={30} color="#7b7b7b" />
                    </div>
                </Column>
            </Popover>
        );
    }

    return <LineWrapper>{cols}</LineWrapper>;
}

Line.defaultProps = {
    onView: null,
    onEdit: null,
    onDelete: null,
    onCancel: null,
};

Line.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            field: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            width: PropTypes.string,
            callback: PropTypes.func,
        })
    ).isRequired,
    rowData: PropTypes.object.isRequired,
    onView: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onCancel: PropTypes.func,
};

export default Line;
