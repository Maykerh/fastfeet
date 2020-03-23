import styled from "styled-components";

export const LineWrapper = styled.tr`
    display: flex;
    padding: 0 20px;
    margin-bottom: 15px;
    background-color: #fff;
    height: 50px;
    align-items: center;
    border-radius: 3px;
    border: 1px solid #e5e5e5;
    box-sizing: border-box;
`;

export const Column = styled.td`
    width: ${props => (props.width ? props.width : "150px")};
    min-width: ${props => (props.width && props.width.indexOf("%") === -1 ? props.width : "100px")};

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:not(:last-child) {
        margin-right: 10px;
    }

    > span {
        font-size: 14px;
        color: #7b7b7b;
        font-weight: bold;
    }

    > #actions-btn {
        font-size: 20;
        user-select: none;
        cursor: pointer;
        display: flex;
        justify-content: center;
    }
`;
