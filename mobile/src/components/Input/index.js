import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, TxtInput } from './styles';

function Input({ style, icon, ...rest }, ref) {
    return (
        <Container style={style}>
            {icon && <Icon name={icon} size={20} color={'#7b7b7b'} />}
            <TxtInput {...rest} ref={ref} />
        </Container>
    );
}

Input.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Input.defaultProps = {
    icon: null,
    style: {},
};

export default forwardRef(Input);
