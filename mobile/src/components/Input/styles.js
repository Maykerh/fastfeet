import styled from 'styled-components/native';

export const Container = styled.View`
    padding: 0 15px;
    height: 56px;
    background: #f5f5f5;
    border-radius: 4px;
    flex-direction: row;
    align-items: center;
`;

export const TxtInput = styled.TextInput.attrs({
    placeholderTextColor: '#7b7b7b90',
})`
    flex: 1;
    font-size: 15px;
    margin-left: 10px;
    color: #7b7b7b;
`;
