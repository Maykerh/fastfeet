import styled from "styled-components";

export const ActionPopover = styled.div`
    width: 140px;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    padding: 10px;
    border-radius: 4px;

    > div {
        display: flex;
        padding: 5px 0 5px 5px;
        user-select: none;
        cursor: pointer;

        &:not(:last-child) {
            border-bottom: 1px solid #e5e5e5;
        }

        &:hover {
            background: #e5e5e5;
        }

        > span {
            color: #7b7b7b;
            border: 0;
            font-size: 14px;
            padding: 2px 0 0 7px;
        }
    }
`;
