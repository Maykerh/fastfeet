import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { Container } from './styles';

export default function Dashboard({ navigation }) {
    return (
        <Container>
            <Text>Dashboard</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                <Text> Change</Text>
            </TouchableOpacity>
        </Container>
    );
}
