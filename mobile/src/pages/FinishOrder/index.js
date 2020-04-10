import React, { useState, useEffect, useRef } from 'react';
import { RNCamera } from 'react-native-camera';
import { format, parseISO } from 'date-fns';
import { View, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';
import { withNavigationFocus } from '@react-navigation/compat';

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
    const { item } = route.params;
    const [image, setImage] = useState(false);
    const [loading, setLoading] = useState(false);

    async function finishOrder() {
        setLoading(true);
        try {
            const formData = new FormData();

            formData.append('file', {
                type: 'image/jpeg',
                uri:
                    Platform.OS === 'android'
                        ? picture
                        : picture.replace('file://', ''),
                name: image.split('/')[9],
            });

            const response = await api.post('files', data);

            await api.put(
                `deliveryman/${deliveryman.id}/deliveries/finish/${item.id}`,
                {
                    end_date: new Date(),
                    signature_id: response.data.id,
                }
            );

            Alert.alert('Sucesso!', 'Entrega finalizada');

            navigation.goBack();
        } catch (error) {
            Alert.alert('Ocorreu um erro!', 'Tente novamente');
        }

        setLoading(false);
    }
    const PendingView = () => (
        <View
            style={{
                flex: 1,
                backgroundColor: 'lightgreen',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Text>Waiting</Text>
        </View>
    );

    const takePicture = async function (camera) {
        const options = { quality: 0.5, base64: true };

        const data = await camera.takePictureAsync(options);

        setImage(data.uri);
    };

    return (
        <Container>
            <BackgroundColor />
            <ContentWrapper>
                <CameraContainer>
                    {image ? (
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
                            <ImagePreview source={{ uri: image }} />
                            <Button
                                color={'#7e42e6'}
                                disabled
                                onPress={finishOrder}
                                loading={loading}>
                                Finalizar Entrega
                            </Button>
                        </PrevieWrapper>
                    ) : (
                        <RNCamera
                            style={{
                                flex: 1,
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                width: '100%',
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
                    )}
                </CameraContainer>
            </ContentWrapper>
        </Container>
    );
}

export default FinishOrder;
