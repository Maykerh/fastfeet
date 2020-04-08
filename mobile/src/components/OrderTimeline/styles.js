import styled from 'styled-components/native';

export const Timeline = styled.View`
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

export const StatusWrapper = styled.View`
    flex-direction: row;
    align-items: center;
    width: 100%;
    padding: 0px 50px;
`;

export const TextWrapper = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0px 25px;
    margin-top: 5px;
`;

export const TimelineDot = styled.View`
    height: 15px;
    width: 15px;
    border: 2px solid #7159c1;
    background-color: ${(props) => (props.done ? '#7159c1' : '#fff')};
    border-radius: 50;
`;

export const DotText = styled.Text`
    color: #7b7b7b;
    font-size: 12px;
    text-align: center;
`;

export const TimelineLine = styled.View`
    height: 3px;
    background-color: #7159c1;
    flex: 1;
    width: 100%;
`;
