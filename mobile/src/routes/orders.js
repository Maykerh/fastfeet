import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import OrderList from '../pages/OrderList';

const Stack = createStackNavigator();

export default () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="OrderList"
                component={OrderList}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="OrderDetail"
                component={() => <Text>Detail</Text>}
                options={{
                    headerTitle: 'Detalhes da encomenda',
                    headerStyle: {
                        backgroundColor: '#7D40E7',
                        elevation: 0,
                        height: 150,
                    },
                    headerLeftContainerStyle: {
                        paddingBottom: 70,
                    },
                    headerTitleContainerStyle: {
                        paddingBottom: 70,
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen
                name="ReportProblem"
                component={() => <Text>Problem</Text>}
                options={{
                    headerShown: true,
                    headerTitle: 'Informar um problema',
                    headerStyle: {
                        backgroundColor: '#7D40E7',
                        elevation: 0,
                        height: 150,
                    },
                    headerLeftContainerStyle: {
                        paddingBottom: 70,
                    },
                    headerTitleContainerStyle: {
                        paddingBottom: 70,
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen
                name="ViewProblem"
                component={() => <Text>View problem</Text>}
                options={{
                    headerShown: true,
                    headerTitle: 'Visualizar problemas',
                    headerStyle: {
                        backgroundColor: '#7D40E7',
                        elevation: 0,
                        height: 150,
                    },
                    headerLeftContainerStyle: {
                        paddingBottom: 70,
                    },
                    headerTitleContainerStyle: {
                        paddingBottom: 70,
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen
                name="ConfirmDelivery"
                component={() => <Text>Confirm delivery</Text>}
                options={{
                    headerShown: true,
                    headerTitle: 'Confirmar entrega',
                    headerStyle: {
                        backgroundColor: '#7D40E7',
                        elevation: 0,
                        height: 150,
                    },
                    headerLeftContainerStyle: {
                        paddingBottom: 70,
                    },
                    headerTitleContainerStyle: {
                        paddingBottom: 70,
                    },
                    headerTintColor: '#fff',
                }}
            />
        </Stack.Navigator>
    );
};
