import react from 'react';
import styled from 'styled-components';
import avatar from '../assets/avatar.jpg';
import {GamingTitle} from './styles.component';
import {Tooltip, IconButton} from '@material-ui/core';
import {EmojiEvents} from '@material-ui/icons';
import {COLORS} from '../styles/colors';

const AchievmentComponent = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 60px;
`

const AchievmentsList = styled('div')`
    display: flex;
    justify-content: center;
    gap: 10px;
    align-items: center;
    width: 100%;
    max-width: 250px;
    margin-top: 10px;
`
const AchievmentsItem = styled('div')`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    height: 40px;
    width: 40px;
    // overflow: hidden;
    padding: 0px;
    background: ${COLORS.primary};
    color: ${COLORS.light0};
    svg{
        color: ${COLORS.light0} !important;
    }
    // img{
    //     width: 100%;
    //     height: auto;
    //     display: block;
    //     border-radius: 100%;
    // }
`

export default function Achievements({achievements}) {
    return (
        <AchievmentComponent>
            <GamingTitle>Conquistas</GamingTitle>
            <AchievmentsList>
                {achievements?.map((item) => (
                    <Tooltip title={item.title} key={item.title}>
                        <AchievmentsItem><EmojiEvents /></AchievmentsItem>
                    </Tooltip>
                ))}
            </AchievmentsList>
        </AchievmentComponent>
    )
}