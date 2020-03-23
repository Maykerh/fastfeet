import styled from "styled-components";

export const HeaderLine = styled.div`
    display: flex;
    width: 100%;
    height: 40px;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
`;

export const HeaderColumn = styled.div`
    width: ${props => props.width};

    > span {
        font-size: 14px;
        color: #262626;
        font-weight: bolder;
    }
`;
