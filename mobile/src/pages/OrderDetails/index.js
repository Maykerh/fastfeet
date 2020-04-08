import React from 'react';
import { Alert } from 'react-native';
import { format, parseISO } from 'date-fns';
import { withNavigationFocus } from '@react-navigation/compat';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
    Container,
    InfoContainer,
    OrderInfo,
    InfoTitle,
    TitleText,
    OrderInfoTitle,
    OrderInfoText,
    DeliveryInfo,
    DeliveryInfoTitle,
    DeliveryInfoText,
    DeliveryDates,
    DeliveryDateTitle,
    DeliveryDateText,
    DeliveryStartDate,
    DeliveryEndDate,
    ActionButtons,
    Withdraw,
    WithdrawText,
    Action,
    ActionBox,
    ActionText,
} from './styles';

function OrderDetails({ route, navigation }) {
    const { item } = route.params;

    return <Container></Container>;
}
