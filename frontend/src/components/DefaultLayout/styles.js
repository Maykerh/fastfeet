import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
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

    > div > a {
        margin-right: 10px;
        font-weight: bolder;
        color: ${props => (props.active ? "#262626" : "#7b7b7b")};
    }
`;

export const HeaderControls = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 100px;
    width: 100px;
    align-items: center;

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
`;
