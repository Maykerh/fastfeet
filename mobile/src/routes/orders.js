import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import OrderList from '../pages/OrderList';
import OrderDetails from '../pages/OrderDetails';
import ReportProblem from '../pages/ReportProblem';

const Stack = createStackNavigator();
const fakeComp = () => <Text>FAKE COMP</Text>;

export default () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="OrderList"
                component={OrderList}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="OrderDetails"
                component={OrderDetails}
                options={{
                    headerTitleAlign: 'center',
                    headerTitle: 'Detalhes da encomenda',
                    headerStyle: {
                        backgroundColor: '#7D40E7',
                        elevation: 0,
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen
                name="ReportProblem"
                component={ReportProblem}
                options={{
                    headerTitleAlign: 'center',
                    headerTitle: 'Reportar um problema',
                    headerStyle: {
                        backgroundColor: '#7D40E7',
                        elevation: 0,
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen
                name="ViewProblem"
                component={fakeComp}
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
                component={fakeComp}
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
