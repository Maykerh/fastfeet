import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: #7e42e6;
    display: flex;
    justify-content: center;
    align-items: center;

    > div {
        height: 340px;
        width: 300px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #f5f5f5;
        padding: 30px;
        border-radius: 3px;

        > div {
            margin: 25px 0 25px 0;
        }

        > form {
            display: flex;
            flex-direction: column;
            width: 100%;
        }
    }
`;
