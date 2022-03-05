import react, { useState, useEffect } from 'react';
import { Card, Typography, IconButton, Button, CardContent, TextField } from '@material-ui/core';
import styled from 'styled-components';
import avatar from '../assets/avatar.jpg';
import './styles.css';
import { useDispatch, useSelector } from 'react-redux';

// import { COLORS } from '../styles/colors';

import { HeaderStyle } from '../styles/header';

import CustomCard from './card.component';
import { GamingTitle } from './styles.component';

import { Close, School, Send } from '@material-ui/icons'

const StyledChatWrapper = styled(Card)`
    display: ${props => props.show ? 'flex' : 'none'};
    flex-direction: column;
    position: fixed;
    z-index: 1000000;
    height: 400px;
    width: 400px;
    bottom: 0px;
    border-radius: 5px 5px 0px 0px;
    right: calc(8.3% + 22px);
    
`;

const ChatHeader = styled(Card)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 0px;
    height: 15%;

`

const MessagesWrapper = styled('div')`
    height: 70%;
    overflow: hidden;
    overflow-y: auto;
    padding: 15px;
`;

const MessageText = styled('div')`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 15%;
    padding: 15px;
`;

const MessageItemWrapper = styled('div')`
    width: 100%;
    margin-bottom: 15px;
    display: flex;
    justify-content: ${props => props.isYou ? 'flex-end' : 'flex-start'};
`

const MessageItem = styled('div')`
    background: ${props => props.isYou ? '#da3941' : '#39A0DA'};
    padding: 15px;
    border-radius: 20px;
    max-width: 70%;
    width: max-content;
`

const loadMessages = [
    { id: 1, text: 'Mensagem', isYou: false, date: '20-06-2021 10:00', name: 'Nome 1' },
    { id: 2, text: 'Mensagem', isYou: true, date: '20-06-2021 12:00', name: 'Nome 2' },
    { id: 3, text: 'Mensagem', isYou: true, date: '20-06-2021 10:00', name: 'Nome 2' },
    { id: 4, text: 'Mensagem', isYou: false, date: '20-06-2021 14:00', name: 'Nome 1' },
    { id: 5, text: 'Mensagem', isYou: true, date: '20-06-2021 14:30', name: 'Nome 2' },
    { id: 6, text: 'Mensagem', isYou: false, date: '20-06-2021 15:00', name: 'Nome 1' },
    { id: 7, text: 'Mensagem', isYou: true, date: '20-06-2021 10:00', name: 'Nome 2' },
];

export const ChatWrapper = () => {

    const dispatch = useDispatch();
    const chat = useSelector(state => state.chat);
    const accessibility = useSelector(state => state.accessibility);
    const [messages, setMessages] = useState([]);

    const handleCloseChat = () => {
        dispatch({ type: 'SET_CHAT', chat: { showChat: false, dataChat: {} } });
    }

    useEffect(() => {
        setMessages(loadMessages);
        console.log(chat);
    }, [chat])

    return (
        <div className={`StyledChatWrapper ${accessibility.nightMode && 'nightMode'}`} show={chat.showChat}>
            <div className="ChatHeader second-background">
                <CardContent>
                    <Typography className="primary-text"><b>{chat?.dataChat?.name}</b></Typography>
                    <Typography className="main-text" variant="subtitle2">{chat?.dataChat?.type}</Typography>
                </CardContent>
                <IconButton onClick={() => handleCloseChat()}>
                    <Close />
                </IconButton>
            </div>
            <MessagesWrapper className="main-background">
                {messages.map((item) => (
                    <MessageItemWrapper key={item.id} isYou={item.isYou}>
                        <MessageItem isYou={item.isYou}>
                            <Typography style={{color: "#ffffff"}}>{item.text}</Typography>
                            <Typography variant="subtitle2">{item.name}{' '}{item.date}</Typography>
                        </MessageItem>
                    </MessageItemWrapper>
                ))}
            </MessagesWrapper>
            <MessageText className="second-background">
                <TextField
                    fullWidth
                    label="Mensagem"
                    name="message"
                    minRows={1}
                    required
                    variant="outlined"
                    size="small"
                />
                <Button size="large" className="main-text">
                    <Send />
                </Button>
            </MessageText>
        </div>
    )
};

export const ChatBar = ({ children, height, className }) => {

    const classes = HeaderStyle();
    const dispatch = useDispatch();
    const [chatOnline, setChatOnline] = useState([]);
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = (chat) => {
        dispatch({ type: 'SET_CHAT', chat: { showChat: true, dataChat: chat } });
        // setOpen(true);
    };

    // const handleDrawerClose = () => {
    //     dispatch({ type: 'SET_CHAT', chat: {showData: false, dataChat: {}} });
    //     // setOpen(false);
    // };

    const handleChatOnline = () => {
        setChatOnline([{ id: 1, name: 'Aluno X', type: 'student' }, { id: 2, name: 'Professor X', type: 'teacher' }])
    }

    useEffect(() => {
        handleChatOnline();
    }, [])

    return (
        <>
            <CustomCard className="second-background main-text" style={{position: 'fixed', marginTop: '20px', minHeight: 'calc(100vh - 110px)'}}>
                <div className="CardWrapper">
                    <h6>Chat</h6>
                    {chatOnline?.map((item) => (
                        <div className="ChatItem" type={item.type} key={item.type} onClick={() => handleDrawerOpen(item)}>
                            {item.type === 'teacher' && (
                                <School />
                            )}
                            <img src={avatar} />
                        </div>
                    ))}
                </div>
            </CustomCard>
        </>
    )
}