import styled from "styled-components";

export const ModalContent = styled.div`
    line-height: 10px;

    img {
        max-width: 395px;
        max-height: 140px;
    }

    div#separator {
        border-bottom: 1px solid #cccccc;
        margin-bottom: 10px;
    }

    > div:nth-child(2) {
        margin-top: 40px;

        > div {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
`;
