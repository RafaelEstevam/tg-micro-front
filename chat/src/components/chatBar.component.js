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
                    <p className="primary-text"><b>{chat?.dataChat?.name}</b></p>
                    <p className="main-text" variant="subtitle2">{chat?.dataChat?.type}</p>
                </CardContent>
                <button onClick={() => handleCloseChat()}>
                    <Close />
                </button>
            </div>
            <MessagesWrapper className="main-background">
                {messages.map((item) => (
                    <MessageItemWrapper key={item.id} isYou={item.isYou}>
                        <MessageItem isYou={item.isYou}>
                            <p style={{ color: "#ffffff" }}>{item.text}</p>
                            <p variant="subtitle2">{item.name}{' '}{item.date}</p>
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
                <button size="large" className="main-text">
                    <Send />
                </button>
            </MessageText>
        </div>
    )
};

export const ChatBar = ({ children, height, className }) => {

    const classes = HeaderStyle();
    const dispatch = useDispatch();
    const { showChat } = useSelector(state => state.chat);
    const [chatOnline, setChatOnline] = useState([]);
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = (chat) => {
        dispatch({ type: 'SET_CHAT', chat: { showChat: true, dataChat: chat } });
        // setOpen(true);
    };

    const handleChatOnline = () => {
        setChatOnline([{ id: 1, name: 'Aluno X', type: 'student' }, { id: 2, name: 'Professor X', type: 'teacher' }])
    }

    useEffect(() => {
        handleChatOnline();
    }, [])

    return (
        <>
            <CustomCard className="main-text" style={{ position: 'fixed', marginTop: '20px', minHeight: 'calc(100vh - 110px)', border: '3px solid #ffffff', borderRadius: '20px' }}>
                <div className="CardWrapper">
                    <h6 variant="h6" style={{ color: "#fff" }}>Chat</h6>
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
            {showChat && <ChatWrapper />}

        </>
    )
}