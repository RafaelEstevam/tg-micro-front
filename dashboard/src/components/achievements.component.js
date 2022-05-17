import react from 'react';
import styled from 'styled-components';
import avatar from '../assets/avatar.jpg';
import {GamingTitle} from './styles.component';
import {Tooltip, IconButton} from '@material-ui/core';
import {EmojiEvents} from '@material-ui/icons';
import {COLORS} from '../styles/colors';
import {achievements} from '../services/achievements'

const AchievmentComponent = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 60px;
`

const AchievmentsList = styled('div')`
    display: flex;
    justify-content: center;
    gap: 17px;
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
    min-height: 40px;
    min-width: 40px;
    // overflow: hidden;
    padding: 0px;
    background: ${COLORS.primary};
    border: 2px solid ${(props) => props.plus ? COLORS.warning : 'transparent'};
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

export default function Achievements({tasks, totalTasks, subjectGrade, classesViewed, totalComments, totalAnswers}) {
    
    const metrics = {
        tasks: tasks.length,
        totalTasks,
        subjectGrade,
        classesViewed: classesViewed.length,
        totalComments: totalComments.total,
        totalAnswers: totalAnswers.total
    }
    return (
        <AchievmentComponent>
            <GamingTitle>Conquistas</GamingTitle>
            <AchievmentsList>
                {achievements?.map((item) => item.metric(item.min, metrics[item.key], item.key) && (
                    <Tooltip title={item.title} key={item.title}>
                        <AchievmentsItem plus={item.plus}>{item.icon}</AchievmentsItem>
                    </Tooltip>
                ))}
            </AchievmentsList>
        </AchievmentComponent>
    )
}