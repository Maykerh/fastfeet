import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import OrderTimeline, {
    CANCELED,
    NOTSTARTED,
    INROUTE,
    DELIVERED,
} from '../../components/OrderTimeline';

import {
    OrderCard,
    OrderHeader,
    OrderFooter,
    OrderTitle,
    FooterContentLabel,
    FooterContentText,
    ViewDetailsText,
    CanceledText,
} from './styles';

export default ({ item, onViewDetails }) => {
    function getStatus(order) {
        if (order.canceled_at != null) {
            return CANCELED;
        }

        if (order.end_date) {
            return DELIVERED;
        }

        if (order.start_date) {
            return INROUTE;
        }

        return NOTSTARTED;
    }

    const isCanceled = getStatus(item) === CANCELED;

    return (
        <OrderCard>
            <OrderHeader>
                <Icon
                    name="local-shipping"
                    size={30}
                    color={isCanceled ? '#de3d3d' : '#7e42e6'}
                />
                <OrderTitle color={isCanceled ? '#de3d3d' : '#7e42e6'}>
                    {`Encomenda ${item.id}`}
                </OrderTitle>
            </OrderHeader>
            {isCanceled ? (
                <CanceledText>Cancelada</CanceledText>
            ) : (
                <OrderTimeline status={getStatus(item)} />
            )}
            <OrderFooter>
                <View>
                    <FooterContentLabel>Data</FooterContentLabel>
                    <FooterContentText>{item.formattedDate}</FooterContentText>
                </View>
                <View>
                    <FooterContentLabel>Cidade</FooterContentLabel>
                    <FooterContentText>{item.city}</FooterContentText>
                </View>
                <ViewDetailsText
                    canceled={isCanceled}
                    onPress={() => onViewDetails(item)}>
                    Ver detalhes
                </ViewDetailsText>
            </OrderFooter>
        </OrderCard>
    );
};
