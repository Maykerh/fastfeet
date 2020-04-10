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
    padding: 20px 20px 20px 20px;
    flex: 1;
`;

export const CameraContainer = styled.View`
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
`;
export const ButtonWrapper = styled.View`
    flex-direction: row;
    justify-content: center;
    border-radius: 50;
    background-color: #eaeaea80;
    margin-bottom: 30px;
    width: 100px;
    height: 100px;
`;

export const CaptureButton = styled(TouchableOpacity)`
    width: 100px;
    height: 100px;
    justify-content: center;
    align-items: center;
`;

export const ImagePreview = styled.Image`
    flex: 1;
    width: 100%;
    margin-bottom: 20px;
`;
export const PreviewButtonWrapper = styled.View`
    border-radius: 50;
    background-color: #eaeaea80;
    width: 100px;
    height: 100px;
    bottom: 100;
    z-index: 10;
    position: absolute;
`;

export const PreviewBtn = styled(TouchableOpacity)`
    flex: 1;
    position: absolute;
    width: 100px;
    height: 100px;
    justify-content: center;
    align-items: center;
`;

export const PrevieWrapper = styled.View`
    flex: 1;
    border-radius: 5px;
    width: 100%;
    justify-content: flex-end;
    align-items: center;
`;
