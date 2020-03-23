import styled from "styled-components";

export const LineWrapper = styled.div`
    display: flex;
    padding: 0 20px;
    margin-bottom: 15px;
    background-color: #fff;
    height: 50px;
    align-items: center;
    border-radius: 3px;
    border: 1px solid #e5e5e5;
`;

export const Column = styled.div`
    width: ${props => (props.width ? props.width : "100%")};

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
