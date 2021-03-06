import styled from "styled-components";

export const HeaderLine = styled.tr`
    display: flex;
    height: 40px;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
`;

export const HeaderColumn = styled.th`
    width: ${props => (props.width ? props.width : "100%")};
    min-width: ${props => (props.width && props.width.indexOf("%") === -1 ? props.width : "100px")};

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;

    &:not(:last-child) {
        margin-right: 10px;
    }

    > span {
        font-size: 14px;
        color: #383838;
        font-weight: bolder;
    }
`;
