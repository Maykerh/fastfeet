import styled from "styled-components";
import { Input } from "@rocketseat/unform";

export const Wrapper = styled.div`
    margin-bottom: 15px;

    span {
        color: #aa0000;
        font-size: 12px;
        margin-left: 2px;
    }
`;
export const StyledInput = styled(Input)`
    height: 50px;
    width: 100%;
    border: 2px solid #dadada;
    color: #7b7b7b;
    font-size: 16px;
    padding: 0 10px;
    box-sizing: border-box;
    border-radius: 5px;
    margin-bottom: 3px;
    margin-top: 2px;

    ::placeholder {
        color: #dadada;
    }
`;

export const Label = styled.label.attrs(props => ({
    htmlFor: props.for ? props.for : null,
}))`
    color: #656565;
    font-family: Roboto, sans-serif;
    font-weight: bolder;
    margin-left: 2px;
`;
