import styled from 'styled-components/native';
import { TextInput } from 'react-native';

export const Container = styled.View`
    flex: 1;
    background: #fff;
`;

export const BackgroundColor = styled.View`
    background-color: #7e42e6;
    height: 20%;
    width: 100%;
    position: absolute;
`;

export const ContentWrapper = styled.View`
    padding: 20px 20px 0 20px;
    flex: 1;
`;

export const ProblemInput = styled(TextInput)`
    background: #fff;
    padding: 20px;
    flex: 0.5;
    margin-bottom: 20px;
    border-radius: 4px;
    color: #7b7b7b;
    border: 2px solid #eaeaea;
    font-size: 16px;
`;
