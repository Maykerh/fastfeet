import React from 'react';
import { Text, View } from 'react-native';
import { StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';

import OrderRoutes from './orders';

const Tab = createBottomTabNavigator();

export default () => {
    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <Tab.Navigator
                tabBarOptions={{
                    activeTintColor: '#7d40e7',
                    style: {
                        height: 70,
                        paddingTop: 15,
                        paddingBottom: 15,
                    },
                }}>
                <Tab.Screen
                    name="Entregas"
                    component={OrderRoutes}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Icon
                                name="reorder"
                                color={focused ? '#7D40E7' : '#ddd'}
                                size={32}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Meu Perfil"
                    component={() => (
                        <View>
                            <Text>Meu perfil</Text>
                        </View>
                    )}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Icon
                                name="account-circle"
                                color={focused ? '#7D40E7' : '#ddd'}
                                size={32}
                            />
                        ),
                    }}
                />
            </Tab.Navigator>
        </>
    );
};
