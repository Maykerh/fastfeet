import React, { useState } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';

import api from '../../services/api';

import Button from '../../components/Button';

import {
    Container,
    BackgroundColor,
    ContentWrapper,
    ProblemInput,
} from './styles';

export default function ProblemReport({ route, navigation }) {
    const { item } = route.params;
    const [loading, setLoading] = useState(false);
    const [problemDescription, setProblemDescription] = useState('');

    async function submitProblem() {
        if (!problemDescription || problemDescription === '') {
            Alert.alert('Erro', 'É necessário preencher a descrição');
            return;
        }

        setLoading(true);

        await api.post(`delivery/${item.id}/problems`, {
            description: problemDescription,
        });

        Alert.alert('Sucesso', 'Problema reportado!');

        setProblemDescription('');

        setLoading(false);

        navigation.goBack();
    }

    return (
        <Container>
            <BackgroundColor />
            <ContentWrapper>
                <ProblemInput
                    multiline
                    placeholder={'Informe o problema'}
                    textAlignVertical={'top'}
                    onChangeText={setProblemDescription}
                    value={problemDescription}
                    onSubmitEditing={submitProblem}
                />
                <Button
                    color={'#7e42e6'}
                    disabled
                    onPress={submitProblem}
                    loading={loading}>
                    Enviar
                </Button>
            </ContentWrapper>
        </Container>
    );
}
