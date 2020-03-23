import styled from "styled-components";

export const Container = styled.div`
    width: 100%;

    div {
        width: 100%;
        overflow: auto;

        > table {
            width: 100%;
        }
    }
`;

export const Controls = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;

    > div:first-child {
        width: 260px;
        display: flex;
        align-items: center;

        svg {
            position: relative;
            left: 9px;
        }

        input {
            height: 35px;
            width: 250px;
            border: 1px solid #dadada;
            color: #7b7b7b;
            font-size: 16px;
            padding: 0 10px 0 30px;
            box-sizing: border-box;
            border-radius: 5px;
            margin-left: -18px;

            ::placeholder {
                color: #dadada;
            }
        }
    }

    > div:nth-child(2) {
        width: 130px;
    }
`;
