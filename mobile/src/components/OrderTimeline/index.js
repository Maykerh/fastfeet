import React from 'react';
import { View } from 'react-native';

import {
    Timeline,
    TimelineDot,
    TimelineLine,
    DotText,
    StatusWrapper,
    TextWrapper,
} from './styles';

export const CANCELED = 0;
export const NOTSTARTED = 1;
export const INROUTE = 2;
export const DELIVERED = 3;

export default function OrderTimeline({ status }) {
    return (
        <Timeline>
            <StatusWrapper>
                <TimelineDot done={status >= NOTSTARTED} />
                <TimelineLine />
                <TimelineDot done={status >= INROUTE} />
                <TimelineLine />
                <TimelineDot done={status === DELIVERED} />
            </StatusWrapper>
            <TextWrapper>
                <DotText>{'Aguardando\nretirada'}</DotText>
                <DotText style={{ marginRight: 8 }}>{'Em rota'}</DotText>
                <DotText style={{ marginRight: 8 }}>{'Entregue'}</DotText>
            </TextWrapper>
        </Timeline>
    );
}
