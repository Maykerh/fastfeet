import styled from "styled-components";

export const Container = styled.div`
    border-radius: 10px;
    background-color: ${props => props.color + 50};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3px;
    width: calc(100% - 8px);
    user-select: none;

    > div {
        width: 10px;
        height: 10px;
        border-radius: 10px;
        margin-right: 6px;
        background-color: ${props => props.color};
    }

    > span {
        color: ${props => props.color};
    }
`;
