import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

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

export const OrderCard = styled.View`
    flex-direction: column;
    background: #fff;

    border: 2px solid #eaeaea;
    border-radius: 5px;
    padding: 15px 20px 15px 20px;
    margin-bottom: 15px;
`;

export const OrderHeader = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const OrderTitle = styled.Text`
    color: ${(props) => props.color};
    font-size: 20px;
    font-weight: bold;
    margin-left: 10px;
`;

export const InfoWrapper = styled.View``;

export const InfoLabel = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #7b7b7b;
    margin-top: 15px;
`;
export const InfoText = styled.Text`
    font-size: 16px;
    color: #666666;
`;

export const DateContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const ActionsWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
`;

export const ActionButton = styled(TouchableOpacity)`
    align-items: center;
    background: #f8f9fd;
    padding: 10px;
    flex: 1;
    border: 1px solid #eee;
`;

export const ButtonText = styled.Text`
    text-align: center;
    font-size: 12px;
    color: #999999;
`;
