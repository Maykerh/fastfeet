import React, { useState } from "react";
import PropTypes from "prop-types";
import Popover from "react-tiny-popover";

import { MdMoreHoriz } from "react-icons/md";

import ActionPopover from "./ActionPopover";

import { LineWrapper, Column } from "./styles";

function Line({ headers, rowData, onView, onEdit, onDelete }) {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const columns = headers.map(header => (
        <Column width={header.width}>
            <span>{rowData[header.field] ? rowData[header.field] : ""}</span>
        </Column>
    ));

    const hasActions = onView || onEdit || onDelete;

    if (hasActions) {
        columns.push(
            <Popover
                isOpen={isPopoverOpen}
                position={"bottom"} // preferred position
                onClickOutside={() => setIsPopoverOpen(false)}
                content={
                    <ActionPopover
                        id={rowData.id}
                        onView={onView}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                }
            >
                <Column width={"50px"}>
                    <div
                        onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                        id="actions-btn"
                    >
                        <MdMoreHoriz size={30} color="#7b7b7b" />
                    </div>
                </Column>
            </Popover>
        );
    }

    return <LineWrapper>{columns}</LineWrapper>;
}

Line.defaultProps = {
    onView: null,
    onEdit: null,
    onDelete: null,
};

Line.propTypes = {
    headers: PropTypes.array.isRequired,
    rowData: PropTypes.array.isRequired,
    onView: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
};

export default Line;
