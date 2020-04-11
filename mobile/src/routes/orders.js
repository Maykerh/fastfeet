import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import OrderList from '../pages/OrderList';
import OrderDetails from '../pages/OrderDetails';
import ProblemReport from '../pages/ProblemReport';
import ProblemView from '../pages/ProblemView';
import FinishOrder from '../pages/FinishOrder';

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
                name="ProblemReport"
                component={ProblemReport}
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
                name="ProblemView"
                component={ProblemView}
                options={{
                    headerShown: true,
                    headerTitle: 'Visualizar problemas',
                    headerStyle: {
                        backgroundColor: '#7D40E7',
                        elevation: 0,
                    },
                    headerTintColor: '#fff',
                }}
            />
            <Stack.Screen
                name="FinishOrder"
                component={FinishOrder}
                options={{
                    headerShown: true,
                    headerTitle: 'Finalizar entrega',
                    headerStyle: {
                        backgroundColor: '#7D40E7',
                        elevation: 0,
                    },
                    headerTintColor: '#fff',
                }}
            />
        </Stack.Navigator>
    );
};
