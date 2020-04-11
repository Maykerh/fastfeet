import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RNCamera } from 'react-native-camera';
import { View, Alert, Text, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';

import Button from '../../components/Button';

import {
    Container,
    BackgroundColor,
    ContentWrapper,
    CameraContainer,
    CaptureButton,
    ButtonWrapper,
    ImagePreview,
    PreviewBtn,
    PrevieWrapper,
    PreviewButtonWrapper,
} from './styles';

function FinishOrder({ route, navigation }) {
    const deliveryman = useSelector((state) => state.auth.deliveryman);
    const { item } = route.params;
    const [image, setImage] = useState(false);
    const [loading, setLoading] = useState(false);

    async function finishOrder() {
        setLoading(true);
        try {
            const formData = new FormData();

            formData.append('file', {
                type: 'image/jpeg',
                uri: image.uri,
                name: image.name,
            });

            const response = await api.post('files', formData);

            await api.put(
                `deliveryman/${deliveryman.id}/deliveries/finish/${item.id}`,
                {
                    end_date: new Date(),
                    signature_id: response.data.id,
                }
            );

            Alert.alert('Sucesso!', 'Entrega finalizada');

            navigation.navigate('OrderList');
            // route.params.onNavigateBack();
        } catch (error) {
            Alert.alert('Ocorreu um erro!', 'Tente novamente');
        }

        setLoading(false);
    }

    const PendingView = () => (
        <View
            style={{
                flex: 1,
                width: '100%',
                backgroundColor: '#f5f5f5',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Text>Aguardando</Text>
        </View>
    );

    const takePicture = async function (camera) {
        const options = { quality: 0.5, base64: true };

        const data = await camera.takePictureAsync(options);

        var image = null;

        if (data) {
            const uriArr = data.uri.split('/');
            image = {
                uri: data.uri,
                name: uriArr[uriArr.length - 1],
            };
        }

        setImage(image);
    };

    return (
        <Container>
            <BackgroundColor />
            <ContentWrapper>
                <CameraContainer>
                    {image && (
                        <PrevieWrapper>
                            <PreviewButtonWrapper>
                                <PreviewBtn onPress={() => setImage(null)}>
                                    <Icon
                                        name="cancel"
                                        size={40}
                                        color="#eaeaea"
                                    />
                                </PreviewBtn>
                            </PreviewButtonWrapper>
                            <ImagePreview source={{ uri: image.uri }} />
                            <Button
                                color={'#7e42e6'}
                                disabled
                                onPress={finishOrder}
                                loading={loading}>
                                Finalizar Entrega
                            </Button>
                        </PrevieWrapper>
                    )}
                    <Modal
                        visible={!image ? true : false}
                        transparent={false}
                        animationType="slide"
                        onRequestClose={() => {
                            Alert('a');
                        }}>
                        <RNCamera
                            style={{
                                flex: 1,
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                            }}
                            captureAudio={false}
                            type={RNCamera.Constants.Type.back}
                            flashMode={RNCamera.Constants.FlashMode.on}>
                            {({ camera, status }) => {
                                if (status !== 'READY') return <PendingView />;
                                return (
                                    <ButtonWrapper>
                                        <CaptureButton
                                            onPress={() => takePicture(camera)}>
                                            <Icon
                                                name="photo-camera"
                                                size={40}
                                                color="#eaeaea"
                                            />
                                        </CaptureButton>
                                    </ButtonWrapper>
                                );
                            }}
                        </RNCamera>
                    </Modal>
                </CameraContainer>
            </ContentWrapper>
        </Container>
    );
}

export default FinishOrder;
