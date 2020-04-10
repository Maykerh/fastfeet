import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';

import api from '../../services/api';

import {
    Container,
    BackgroundColor,
    ContentWrapper,
    ProblemList,
    ProblemCard,
    Description,
    Date,
} from './styles';

export default function ProblemView({ route }) {
    const { item } = route.params;
    const [problems, setProblems] = useState([]);

    useEffect(() => {
        async function loadProblems() {
            const response = await api.get(`delivery/${item.id}/problems`);

            const data = response.data.problems.map((problem) => ({
                ...problem,
                formattedDate: format(
                    parseISO(problem.createdAt),
                    'dd/MM/yyyy'
                ),
            }));

            setProblems(data);
        }

        loadProblems();
    }, []);

    return (
        <Container>
            <BackgroundColor />
            <ContentWrapper>
                <ProblemList
                    key="problemList"
                    data={problems}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <ProblemCard>
                            <Description>{item.description}</Description>
                            <Date>{item.formattedDate}</Date>
                        </ProblemCard>
                    )}
                />
            </ContentWrapper>
        </Container>
    );
}
