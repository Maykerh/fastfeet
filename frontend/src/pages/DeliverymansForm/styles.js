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

export const ImageInput = styled.div`
    align-self: center;
    margin-bottom: 20px;
    width: 150px;

    #upload-component {
        display: flex;
        flex-direction: column;
        background-color: #dadada;
        color: #7b7b7b;
        height: 150px;
        max-height: 150px;
        font-weight: bold;
        font-size: 14px;
        align-items: center;
        justify-content: center;
        border-radius: 100%;

        &:hover {
            opacity: 0.7;
        }
    }

    label {
        cursor: pointer;

        &:hover {
            opacity: 0.7;
        }

        img {
            height: 150px;
            max-height: 150px;
            width: 100%;
            border: none;
            border-radius: 100%;
        }

        input {
            display: none;
        }
    }
`;
