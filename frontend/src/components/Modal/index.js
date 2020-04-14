import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import { useEffect } from "react";

import { MdClose } from "react-icons/md";

export default function MyModal({ getContent, isOpen, onClose, width, height }) {
    const [isModalOpen, setIsModalOpen] = useState(isOpen);

    useEffect(() => {
        setIsModalOpen(isOpen);
    }, [isOpen]);

    return (
        <div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={onClose}
                shouldCloseOnOverlayClick
                ariaHideApp={false}
                style={{
                    content: {
                        width: `${width}px`,
                        height: `${height}px`,
                        top: `calc(50% - ${height / 2}px`,
                        left: `calc(50% - ${width / 2}px`,
                        right: "auto",
                    },
                }}
            >
                <div style={{ float: "right", cursor: "pointer" }}>
                    <MdClose onClick={onClose} size={20} color="#999999" />
                </div>
                <div>{getContent()}</div>
            </Modal>
        </div>
    );
}

MyModal.defaultProps = {
    width: 500,
    height: 500,
};

MyModal.propTypes = {
    getContent: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
};
