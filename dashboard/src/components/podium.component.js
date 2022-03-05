import react from 'react';
import styled from 'styled-components';
import { Typography, Tooltip } from '@material-ui/core';
import { COLORS } from '../styles/colors';

import avatar from '../assets/avatar.jpg';
import avatar2 from '../assets/avatar-2.jpg';
import avatar3 from '../assets/avatar-3.jpg';

import { Star } from '@material-ui/icons'

import { GamingTitle } from './styles.component';

const Position = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    border-radius: ${COLORS.borderRadius};
    padding: 5px;
    color: ${COLORS.light0};
    
`

const PodiumComponetn = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
`

const StyledPodium = styled('div')`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 280px;
    margin-top: 10px;
`
const StyledFirstPosition = styled(Position)`
    width: 35%;
    min-height: 80px;
    background: ${COLORS.primary};
    svg:{
        color: ${COLORS.light0} !important;
    }
`
const StyledSecondPosition = styled(Position)`
    width: 28%;
    min-height:60px;
    background: ${COLORS.secondary};
`
const StyledThirdPosition = styled(Position)`
    width: 28%;
    min-height: 50px;
    background: ${COLORS.dark0};
`;

const AchievmentsItem = styled('div')`
    display: block;
    border-radius: 100%;
    width: 80%;
    overflow: hidden;
    img{
        width: 100%;
        height: auto;
        display: block
    }
`

export default function Podium({ podium }) {
    return (
        <PodiumComponetn>
            <GamingTitle>Pódio</GamingTitle>
            <StyledPodium>
                <Tooltip title={podium?.second?.student}>
                    <StyledSecondPosition>
                        <AchievmentsItem><img src={avatar2} /></AchievmentsItem>
                        <Typography>2º</Typography>
                    </StyledSecondPosition>
                </Tooltip>

                <Tooltip title={podium?.first?.student}>
                    <StyledFirstPosition>
                        <Star style={{color: COLORS.light0}} />
                        <AchievmentsItem><img src={avatar} /></AchievmentsItem>
                        <Typography>1º</Typography>
                    </StyledFirstPosition>
                </Tooltip>

                <Tooltip title={podium?.third?.student}>

                    <StyledThirdPosition>
                        <AchievmentsItem><img src={avatar3} /></AchievmentsItem>
                        <Typography>3º</Typography>
                    </StyledThirdPosition>
                </Tooltip>

            </StyledPodium>
        </PodiumComponetn>

    )
}