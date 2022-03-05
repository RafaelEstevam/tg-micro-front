import react from 'react';
import styled from 'styled-components';
import { Typography, Card, CardContent, Grid } from '@material-ui/core';
import { Check, CheckBox } from '@material-ui/icons'

const MetricsComponent = styled('div')`
    // max-width: 100%;
    // max-width: 100vh;
    // overflow: hidden;
    // width: 100%;
    // width: max-content;
    // display: flex;
    // justify-content: space-between;
    // overflow-x: auto;
    max-width: 87vw;
    overflow: hidden;
    overflow-x: auto;
`

const MetricsList = styled('div')``

const MetricsItemsWrapper = styled(Grid)`
    width: max-content;
    @media(min-width:1366px){
        width: 100%;
    }
`

const MetricWrapper = styled(Grid)`
    // max-width: inherit;
`

const MetricCard = styled('div')`
    width: 100%;
    border: 1px solid #ccc;
    height: 150px;
    border-radius: 20px;
    min-width: 180px;
`

export default function MetricsCarrossel() {
    return (
        <MetricsComponent>
            <MetricsItemsWrapper container spacing={3}>
                <MetricWrapper item xs={3}>
                    <MetricCard>
                        teste
                    </MetricCard>
                </MetricWrapper>
                <MetricWrapper item xs={3}>
                    <MetricCard>
                        teste
                    </MetricCard>
                </MetricWrapper>
                <MetricWrapper item xs={3}>
                    <MetricCard>
                        teste
                    </MetricCard>
                </MetricWrapper>
                <MetricWrapper item xs={3}>
                    <MetricCard>
                        teste
                    </MetricCard>
                </MetricWrapper>
            </MetricsItemsWrapper>
        </MetricsComponent>

    )
}