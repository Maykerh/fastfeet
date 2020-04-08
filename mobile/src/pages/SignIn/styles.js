import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Input from '../../components/Input';

export const Container = styled.KeyboardAvoidingView.attrs({
    enabled: Platform.OS === 'ios',
    behavior: 'padding',
})`
    flex: 1;
    align-items: center;
    padding: 0 30px;
    background-color: #7e42e6;
    overflow: hidden;
`;

export const LogoWrapper = styled.View`
    padding: 0px 50px 0px 40px;
    margin-bottom: 30px;
    width: 100%;
    margin-top: 60%;
`;

export const Form = styled.View`
    align-self: stretch;
`;

export const FormInput = styled(Input)`
    margin-bottom: 15px;
`;
