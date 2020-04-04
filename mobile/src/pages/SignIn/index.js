import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { Container } from './styles';

export default function SignIn({ navigation }) {
    return (
        <Container>
            <Text>SignIn</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
                <Text>Change</Text>
            </TouchableOpacity>
        </Container>
    );
}
