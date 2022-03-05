import react from 'react';
import styled from 'styled-components';
import {Typography, Card, CardContent} from '@material-ui/core';
import {Check, CheckBox} from '@material-ui/icons'

const ActivityComponetn = styled(Card)`
    margin-bottom: 20px;
`

const ActivityItem = styled(CardContent)`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export default function Activity(){
    return (
        <ActivityComponetn>
            <ActivityItem>
                <Check/>
                <Typography>Atividade para entregar</Typography>
            </ActivityItem>
        </ActivityComponetn>
        
    )
}