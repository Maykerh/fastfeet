import styled from "styled-components";

export const Container = styled.div`
    max-width: 1100px;
`;

export const HeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    button:nth-child(2) {
        margin-right: 10px;
    }
`;

export const FormWrapper = styled.div`
    background-color: #fff;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
`;

export const SelectWrapper = styled.div`
    margin-bottom: 15px;

    .css-yk16xz-control {
        border: 2px solid #dadada !important;
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
