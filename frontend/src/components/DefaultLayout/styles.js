import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    min-width: 800px;
`;

export const Header = styled.div`
    width: 100%;
    height: 60px;
    background-color: #ffffff;
    border-bottom: 2px solid #e5e5e5;
    display: flex;
    align-items: center;

    > div:first-child {
        width: 190px;
        min-width: 190px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 3px;
        border-right: 2px solid #e5e5e5;

        > img {
            width: 150px;
        }
    }
`;

export const HeaderMenu = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 25px;

    > a {
        margin-right: 10px;
        font-weight: bolder;
        color: #7b7b7b;
    }

    ${props =>
        css`
            #${props.activePage} {
                color: #262626;
            }
        `}
`;

export const HeaderControls = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 100px;
    width: 100px;
    align-items: flex-end;
    flex: 1;
    margin-right: 15px;

    > div {
        > div:first-child {
            font-size: 12px;
            font-weight: bold;
            color: #262626;
            margin-bottom: 5px;
        }

        > div:nth-child(2) {
            font-size: 12px;
            color: #aa0000;
            cursor: pointer;
            user-select: none;
        }
    }
`;

export const ContentContainer = styled.div`
    height: 100%;
    margin: 0 auto;
    padding: 0 80px;
`;