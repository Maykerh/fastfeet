import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import { Container, Text } from './styles';

export default function Button({ children, loading, color, ...rest }) {
    return (
        <Container color={color} {...rest}>
            {loading ? (
                <ActivityIndicator size="small" color="#7b7b7b" />
            ) : (
                <Text>{children}</Text>
            )}
        </Container>
    );
}
