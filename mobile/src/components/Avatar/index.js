import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';

import { Container, UserAvatar } from './styles';

export default function Avatar({ url, width, height, userName }) {
    const urlName = userName ? userName.split(' ').join('+') : 'x';
    const genericImageUrl = `https://ui-avatars.com/api/?name=${urlName}`;
    const finalUrl = url || genericImageUrl;

    console.tron.log(finalUrl);

    return (
        <UserAvatar width={width} height={height} source={{ uri: finalUrl }} />
    );
}

Avatar.propTypes = {
    userName: PropTypes.string,
    url: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
};
