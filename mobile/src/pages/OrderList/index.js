import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, parseISO } from 'date-fns';

import api from '../../services/api';

import { logout } from '../../store/modules/auth/actions';

import OrderCard from '../../components/OrderCard';
import Avatar from '../../components/Avatar';

import {
    Container,
    Header,
    WelcomeText,
    UserName,
    LogoutButton,
    HeaderTextWrapper,
    Grid,
    GridHeader,
    GridTitle,
    GridFilters,
    FilterButton,
    GridBody,
    OrderList,
    EmptyState,
    EmptyStateText,
} from './styles';

export default ({ navigation }) => {
    const deliveryman = useSelector((state) => state.auth.deliveryman);
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState('pending');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [reloadTrigger, setReloadTrigger] = useState(0);

    const dispatch = useDispatch();

    async function handleLogout() {
        dispatch(logout());

        navigation.navigate('SignIn');
    }

    useEffect(() => {
        async function loadData() {
            setLoading(true);

            const response = await api.get(
                `deliveryman/${deliveryman.id}/deliveries`,
                {
                    params: {
                        showFinished: filter === 'delivered' ? 1 : 0,
                        showCanceled: filter === 'canceled' ? 1 : 0,
                        page: page,
                    },
                }
            );

            const data = response.data.map((order) => ({
                ...order,
                city: order.Recipient.city,
                formattedDate: format(parseISO(order.createdAt), 'dd/MM/yyyy'),
            }));

            if (page === 1) {
                setOrders(data);
            } else {
                setOrders([...orders, ...data]);
            }

            setLoading(false);
            setRefreshing(false);
        }

        loadData();
    }, [filter, page, reloadTrigger]);

    function handFilterChange(filter) {
        setFilter(filter);
        setPage(1);
        setRefreshing(true);
    }

    return (
        <Container>
            <Header>
                <Avatar
                    url={null}
                    width={80}
                    height={80}
                    userName={deliveryman.name}
                />
                <HeaderTextWrapper>
                    <WelcomeText>Bem vindo de volta</WelcomeText>
                    <UserName numberOfLines={1}>{deliveryman.name}</UserName>
                </HeaderTextWrapper>
                <LogoutButton onPress={handleLogout}>
                    <Icon name="exit-to-app" size={30} color="#de3d3d" />
                </LogoutButton>
            </Header>
            <Grid>
                <GridHeader>
                    <GridTitle>Entregas</GridTitle>
                    <GridFilters>
                        <FilterButton
                            onPress={() => {
                                handFilterChange('pending');
                            }}
                            active={filter === 'pending'}>
                            Pendentes
                        </FilterButton>
                        <FilterButton
                            onPress={() => {
                                handFilterChange('delivered');
                            }}
                            active={filter === 'delivered'}>
                            Entregues
                        </FilterButton>
                        <FilterButton
                            onPress={() => {
                                handFilterChange('canceled');
                            }}
                            active={filter === 'canceled'}>
                            Canceladas
                        </FilterButton>
                    </GridFilters>
                </GridHeader>
                <GridBody>
                    {orders.length === 0 && !loading ? (
                        <EmptyState>
                            <EmptyStateText>
                                Nenhuma entrega cadastrada.
                            </EmptyStateText>
                        </EmptyState>
                    ) : (
                        <OrderList
                            key="orderList"
                            data={orders}
                            keyExtractor={(item) => String(item.id)}
                            onRefresh={() => {
                                setPage(1);
                                setReloadTrigger(reloadTrigger + 1);
                                setRefreshing(true);
                            }}
                            refreshing={refreshing}
                            onEndReachedThreshold={0.1}
                            bounces={false}
                            onEndReached={() => {
                                if (orders.length / 10 === page) {
                                    setPage(page + 1);
                                }
                            }}
                            ListFooterComponent={() =>
                                loading && (
                                    <ActivityIndicator
                                        size="small"
                                        color="#383838"
                                    />
                                )
                            }
                            renderItem={({ item }) => (
                                <OrderCard
                                    item={item}
                                    onViewDetails={() =>
                                        navigation.navigate('OrderDetails', {
                                            item,
                                        })
                                    }
                                />
                            )}
                        />
                    )}
                </GridBody>
            </Grid>
        </Container>
    );
};
