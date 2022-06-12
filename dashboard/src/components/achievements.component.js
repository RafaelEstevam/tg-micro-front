import react, { useState } from 'react';
import styled from 'styled-components';
import avatar from '../assets/avatar.jpg';
import {GamingTitle} from './styles.component';
import {Tooltip, IconButton, Button, Typography} from '@material-ui/core';
import {EmojiEvents, RemoveRedEye} from '@material-ui/icons';
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
    flex-flow: wrap;
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
    max-height: 40px;
    max-width: 40px;
    padding: 0px;
    background: ${COLORS.primary};
    border: 2px solid ${(props) => props.plus ? COLORS.warning : 'transparent'};
    opacity: ${props => props.activate ? 1 : 0.3};
    color: ${COLORS.light0};
    svg{
        color: ${COLORS.light0} !important;
    }
`;

const AchievementsTitle = styled('div')`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const AchievementsModal = styled('div')`
    display: block;
    width: 100%;
    height: 100vh;
    position: fixed;
    z-index: 1101;
    top: 0px;
    left: 0px;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const AchievementsModalWrapper = styled('div')`
    width: 50%;
    min-height: 300px;
    margin: auto;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
`;

const ModalTitle = styled('div')`
    padding-bottom: 20px
`;

const ModalBody = styled('div')`
    display: flex;
    justify-content: center;
    padding-bottom: 20px;
`

const ModalTitleLabel = styled(Typography)`
    color: ${COLORS.primary};
    font-size: 1.28rem;
`;

const ModalActions = styled('div')`
    display: flex;
    justify-content: flex-end;
`

const Modal = ({show, setShow, metrics}) => {

    return show && (
        <AchievementsModal>
            <AchievementsModalWrapper className='main-background'>
                <ModalTitle>
                    <ModalTitleLabel className="main-text">Conquistas</ModalTitleLabel>
                </ModalTitle>
                <ModalBody>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px'}}>
                        <Typography className='main-text'>Consulte todas as conquistas disponíveis para alcançar.</Typography>
                        <AchievmentsList>
                            {achievements?.map((item) => (
                                <Tooltip title={item.title} key={item.title}>
                                    <AchievmentsItem plus={item.plus} activate={item.metric(item.min, metrics[item.key], item.key)}>{item.icon}</AchievmentsItem>
                                </Tooltip>
                            ))}
                        </AchievmentsList>
                    </div>
                </ModalBody>
                <ModalActions>
                    <Button color="primary" variant="contained" onClick={() => setShow(false)}>
                        Fechar
                    </Button>
                </ModalActions>
            </AchievementsModalWrapper>
        </AchievementsModal>
    )
}

export default function Achievements({tasks, totalTasks, subjectGrade, classesViewed, totalComments, totalAnswers}) {
    
    const metrics = {
        tasks: tasks.length,
        totalTasks,
        subjectGrade,
        classesViewed: classesViewed.length,
        totalComments: totalComments.total,
        totalAnswers: totalAnswers.total
    };

    const [show, setShow] = useState(false);

    return (
        <AchievmentComponent>
            <AchievementsTitle>
                <GamingTitle>Conquistas</GamingTitle>
                <Tooltip title="Ver todas as conquistas">
                    <IconButton onClick={() => setShow(true)}><RemoveRedEye /></IconButton>
                </Tooltip>
            </AchievementsTitle>
            
            <AchievmentsList>
                {achievements?.map((item) => item.metric(item.min, metrics[item.key], item.key) && (
                    <Tooltip title={item.title} key={item.title}>
                        <AchievmentsItem plus={item.plus} activate={true}>{item.icon}</AchievmentsItem>
                    </Tooltip>
                ))}
            </AchievmentsList>
            <Modal {...{setShow, show, metrics}} />
        </AchievmentComponent>
    )
}