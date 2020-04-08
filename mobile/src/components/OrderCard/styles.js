import styled from 'styled-components/native';

export const OrderCard = styled.View`
    border: 2px solid #eaeaea;
    border-radius: 5px;
    margin-bottom: 15px;
`;

export const OrderHeader = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 25px;
    padding: 15px 20px 0 20px;
`;

export const OrderTitle = styled.Text`
    color: ${(props) => props.color};
    font-size: 20px;
    font-weight: bold;
    margin-left: 10px;
`;

export const OrderFooter = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #eaeaea;
    margin-top: 25px;
    padding: 25px;
`;

export const ViewDetailsText = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: ${(props) => (props.canceled ? '#de3d3d' : '#7d40e7')};
`;

export const CanceledText = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #de3d3d;
    margin-left: 25px;
`;

export const FooterContentLabel = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: #7b7b7b;
`;

export const FooterContentText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #383838;
`;
