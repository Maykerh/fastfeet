import styled from "styled-components";
import { Input } from "@rocketseat/unform";

export const StyledInput = styled(Input)`
    height: 50px;
    width: 100%;
    border: 2px solid #dadada;
    color: #7b7b7b;
    font-size: 16px;
    padding: 0 10px;
    box-sizing: border-box;
    border-radius: 5px;
    margin-bottom: 15px;
    margin-top: 2px;

    ::placeholder {
        color: #dadada;
    }
`;

export const Label = styled.label.attrs(props => ({
    for: props.for ? props.for : null,
}))`
    color: #656565;
    font-family: Roboto, sans-serif;
    font-weight: bolder;
    margin-left: 2px;
`;
