import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, View } from 'react-native';
import { format, parseISO } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';
import Button from '../../components/Button';

import {
    Container,
    ContentWrapper,
    BackgroundColor,
    OrderHeader,
    OrderTitle,
    InfoLabel,
    InfoText,
    ActionsWrapper,
    ActionButton,
    ButtonText,
    DateContainer,
    InfoWrapper,
    OrderCard,
} from './styles';
import { useSelector } from 'react-redux';

function OrderDetails({ route, navigation }) {
    const { item } = route.params;
    const deliverymanId = useSelector((state) => state.auth.deliveryman.id);

    const [loading, setLoading] = useState(false);

    const start_date = item.start_date
        ? format(parseISO(item.start_date), 'dd/MM/yyyy')
        : null;

    const end_date = item.end_date
        ? format(parseISO(item.end_date), 'dd/MM/yyyy')
        : null;

    const showWithdrawBtn = !item.start_date;

    const showActionButtons =
        item.start_date && !item.canceled_at && !item.end_date;

    function getStatus() {
        if (item.canceled_at != null) {
            return 'Cancelada';
        }

        if (item.end_date) {
            return 'Entregue';
        }

        if (item.start_date) {
            return 'Em rota';
        }

        return 'Não iniciada';
    }

    function getAddress() {
        const { street, number, complement, city, state, cep } = item.Recipient;

        var address = `${street} nº ${number}`;

        if (complement) {
            address += `, ${complement}`;
        }

        address += `, ${city} - ${state}, ${cep}`;

        return address;
    }

    async function withdraw() {
        setLoading(true);

        await api.put(
            `deliveryman/${deliverymanId}/deliveries/start/${item.id}`,
            { start_date: new Date(2020, 8, 4, 11) }
        );
        alert('deu');
        setLoading(false);

        Alert.alert('Sucesso', 'Encomenda retirada');

        route.params.onNavigateBack();
        navigation.navigate('OrderList');
    }

    return (
        <Container>
            <BackgroundColor />
            <ContentWrapper>
                <OrderCard>
                    <OrderHeader>
                        <Icon
                            name="local-shipping"
                            size={30}
                            color={'#7e42e6'}
                        />
                        <OrderTitle color={'#7e42e6'}>
                            {'Informações da entrega'}
                        </OrderTitle>
                    </OrderHeader>
                    <InfoWrapper>
                        <InfoLabel>DESTINATÁRIO</InfoLabel>
                        <InfoText>{item.Recipient.name}</InfoText>
                        <InfoLabel>ENDEREÇO DA ENTREGA</InfoLabel>
                        <InfoText>{getAddress()}</InfoText>
                        <InfoLabel>PRODUTO</InfoLabel>
                        <InfoText>{item.product}</InfoText>
                    </InfoWrapper>
                </OrderCard>
                <OrderCard>
                    <OrderHeader>
                        <Icon name="event" size={30} color={'#7e42e6'} />
                        <OrderTitle color={'#7e42e6'}>
                            {'Situação da entrega'}
                        </OrderTitle>
                    </OrderHeader>
                    <InfoWrapper>
                        <InfoLabel>STATUS</InfoLabel>
                        <InfoText>{getStatus()}</InfoText>
                        <DateContainer>
                            <View>
                                <InfoLabel>DATA DE RETIRADA</InfoLabel>
                                <InfoText>
                                    {start_date
                                        ? start_date
                                        : '- - / - - / - -'}
                                </InfoText>
                            </View>
                            <View>
                                <InfoLabel>DATA DE ENTREGA</InfoLabel>
                                <InfoText>
                                    {end_date ? end_date : '- - / - - / - -'}
                                </InfoText>
                            </View>
                        </DateContainer>
                    </InfoWrapper>
                </OrderCard>
                {showWithdrawBtn && (
                    <Button
                        color={'#7e42e6'}
                        disabled
                        onPress={() => withdraw()}
                        loading={loading}>
                        Retirar encomenda
                    </Button>
                )}
                {showActionButtons && (
                    <ActionsWrapper>
                        <ActionButton
                            onPress={() =>
                                navigation.navigate('ProblemReport', {
                                    item,
                                })
                            }>
                            <Icon name="cancel" size={30} color="#de3d3d" />
                            <ButtonText>{'Informar\nProblema'}</ButtonText>
                        </ActionButton>
                        <ActionButton
                            onPress={() =>
                                navigation.navigate('ProblemView', {
                                    item,
                                })
                            }>
                            <Icon name="error" size={30} color="#ffbc00" />
                            <ButtonText>{'Visualizar\nProblemas'}</ButtonText>
                        </ActionButton>
                        <ActionButton
                            onPress={() =>
                                navigation.navigate('FinishOrder', {
                                    item,
                                })
                            }>
                            <Icon
                                name="check-circle"
                                size={30}
                                color="#7e42e6"
                            />
                            <ButtonText>{'Finalizar\nEntrega'}</ButtonText>
                        </ActionButton>
                    </ActionsWrapper>
                )}
            </ContentWrapper>
        </Container>
    );
}

export default OrderDetails;
