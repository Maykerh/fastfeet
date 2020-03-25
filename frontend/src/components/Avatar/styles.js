import styled from "styled-components";

export const Container = styled.div`
    img {
        height: ${props => props.height};
        width: ${props => props.width};
        border-radius: 50%;
        border: 1px solid rgba(255, 255, 255, 0.3);
        background: #eee;
    }
`;
