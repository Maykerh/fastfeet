import React, { useEffect, useState } from 'react';
import { Image, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../components/Button';

import { Container, Form, FormInput, Logo, LogoWrapper } from './styles';

import { signInRequest } from '../../store/modules/auth/actions';
import logo from '../../assets/logo.png';

import api from '../../services/api';

export default function SignIn({ navigation }) {
    const signed = useSelector((state) => state.auth.signed);
    const dispatch = useDispatch();

    const [id, setId] = useState(null);

    const loading = useSelector((state) => state.auth.loading);

    async function handleSubmit() {
        if (!id) {
            Alert.alert('Falha na autenticação', 'Campo ID não foi preenchido');
            return;
        }

        await dispatch(signInRequest(id));
    }

    useEffect(() => {
        if (signed) {
            navigation.navigate('Dashboard');
        }
    }, [signed]);

    return (
        <Container>
            <LogoWrapper>
                <Image
                    source={logo}
                    resizeMode={'contain'}
                    style={{ width: '100%', height: 100 }}
                />
            </LogoWrapper>
            <Form>
                <FormInput
                    icon={'person-outline'}
                    keyboardType={'email-address'}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    placeholder={'Informe seu ID de cadastro'}
                    returnKeyType={'next'}
                    value={id}
                    onChangeText={(text) => {
                        setId(text.replace(/[^0-9]/g, ''));
                    }}
                />

                <Button
                    color={'#81bf22'}
                    disabled
                    onPress={handleSubmit}
                    loading={loading}>
                    Entrar no sistema
                </Button>
            </Form>
        </Container>
    );
}
