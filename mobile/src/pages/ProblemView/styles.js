import styled from 'styled-components/native';

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

export const ProblemList = styled.FlatList.attrs({
    showsVerticalScrollIndicator: false,
})``;

export const ProblemCard = styled.View`
    background-color: #fff;
    border: 1px solid #eaeaea;
    min-height: 80px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    border-radius: 5px;
    margin-bottom: 15px;
`;

export const Description = styled.Text`
    font-size: 18px;
    color: #7b7b7b;
    font-weight: bold;
    flex: 1;
`;

export const Date = styled.Text`
    font-size: 16px;
    color: #7b7b7b;
    margin-left: 10px;
`;
