import styled from "styled-components";

export const Container = styled.button`
    width: ${props => (props.width ? props.width : "180px")};
    height: 40px;
    color: #fff;
    background-color: ${props => (props.color ? props.color : "#7e42e6")};
    border: none;
    border-radius: 4px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        margin-right: 5px;
    }
`;
