import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format, parseISO } from 'date-fns';

import Avatar from '../../components/Avatar';
import Button from '../../components/Button';

import { logout } from '../../store/modules/auth/actions';

import {
    Container,
    ContentWrapper,
    InfoLabel,
    InfoText,
    ButtonWrapper,
    InfoWrapper,
} from './styles';

export default function Profile({ navigation }) {
    const deliveryman = useSelector((state) => state.auth.deliveryman);

    const dispatch = useDispatch();

    async function handleLogout() {
        dispatch(logout());

        navigation.navigate('SignIn');
    }

    return (
        <Container>
            <ContentWrapper>
                <Avatar
                    url={deliveryman.avatar ? deliveryman.avatar.url : null}
                    width={'200px'}
                    height={'200px'}
                    userName={deliveryman.name}
                />
                <InfoWrapper>
                    <InfoLabel>Nome completo</InfoLabel>
                    <InfoText>{deliveryman.name}</InfoText>
                    <InfoLabel>Nome completo</InfoLabel>
                    <InfoText>{deliveryman.email}</InfoText>
                    <InfoLabel>Nome completo</InfoLabel>
                    <InfoText>
                        {deliveryman.createdAt &&
                            format(
                                parseISO(deliveryman.createdAt),
                                'dd/MM/yyyy'
                            )}
                    </InfoText>
                </InfoWrapper>
                <ButtonWrapper>
                    <Button color={'#de3d3d'} onPress={handleLogout}>
                        Logout
                    </Button>
                </ButtonWrapper>
            </ContentWrapper>
        </Container>
    );
}
