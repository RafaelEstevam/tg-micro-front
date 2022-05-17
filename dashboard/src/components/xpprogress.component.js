
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styled from 'styled-components';
import avatar from '../assets/avatar.jpg';
import {xpFactor, levelFactor} from '../services/achievements'

import {Typography, Tooltip} from '@material-ui/core';

import {COLORS} from '../styles/colors';

const XpComponent = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const CircularDiv = styled('div')`
    display: block;
    border-radius: 100%;
    width: 70%;
    overflow: hidden;
    margin-top: -85%;
    img{
        width: 100%;
        height: auto;
        display: block
    }
`;

const Xp = styled(Typography)`
    padding: 5px 8px;
    border-radius: 20px;
    font-size: 0.75rem;
    color: ${COLORS.light0};
    background: ${COLORS.secondary};
    // position: absolute;
    font-weight: bold;
    z-index: 2;
    margin-top: -30px;
    margin-right: ${(props) => props.left ? '70%' : '-80%'};

    // bottom: 0px;
    // right: 0px;
`

export default function XpProgress({experience, classesViewed}) {

    const percentage = experience?.currentLevel;

    return (
        <XpComponent>
            <CircularProgressbar
                value={classesViewed.length * 5}
                background={false}
                styles={buildStyles({
                    strokeLinecap: 'round',
                    textSize: '16px',
                    pathTransitionDuration: 0.5,
                    pathColor: COLORS.primary,
                    textColor: COLORS.secondary,
                    trailColor: 'rgba(0,0,0,0.1)',
                    backgroundColor: COLORS.primary,
                })}
            />
            <CircularDiv>
                <img src={avatar} />
            </CircularDiv>
            <Tooltip title="Pontos por cada interação">
                <>
                <Xp>{classesViewed.length * xpFactor} XP</Xp>
                <Xp left>Nivel {Math.round(classesViewed.length / levelFactor)}</Xp>
                </>
            </Tooltip>
        </XpComponent>
    );
}
