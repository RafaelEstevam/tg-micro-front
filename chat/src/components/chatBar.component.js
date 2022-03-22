import react, { useState, useEffect } from 'react';
import { Card, Typography, IconButton, Button, CardContent, TextField, Tooltip } from '@material-ui/core';
import styled from 'styled-components';
import avatar from '../assets/avatar.jpg';
import './styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../styles/colors';
import chatHook from '../hooks/chatHook';

import CustomCard from './card.component';

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
    gap: 15px;
`;

const MessageItemWrapper = styled('div')`
    width: 100%;
    margin-bottom: 15px;
    display: flex;
    justify-content: ${props => props.isYou ? 'flex-start' : 'flex-end'};
`

const MessageItem = styled('div')`
    background: ${props => props.isYou ? '#aaa' : '#da3941'};
    padding: 10px;
    border-radius: 10px;
    max-width: 70%;
    width: max-content;

    p{
        font-size: 0.8rem;
    }
`;

const CustomInput = styled('input')`
    width: 100%;
    height: 32px;
    color: ${COLORS.gray0} !important;
    border-radius: 5px;
`

const CustomButton = styled('button')`
    border: none;
    background: none;
    cursor: pointer;
    :hover{
        opacity: 0.8
    }
    svg{
        color: ${(props) => props.nightMode ? '#fff' : '#da3941'}
    }

`

export const ChatWrapper = ({ theme }) => {

    const dispatch = useDispatch();
    const {chat, showChat} = useSelector(state => state.chat);
    const accessibility = useSelector(state => state.accessibility);
    const [message, setMessage] = useState([]);
    const [messages, setMessages] = useState([]);
    const { nightMode } = theme;
    const { usersWebSocket, user_id, API } = chatHook();
    const [userMessage, setUserMessage] = useState('');

    const handleCloseChat = () => {
        dispatch({ type: 'SET_CHAT', chat: { showChat: false, dataChat: {} } });
    };

    const submitMessage = (message) => {
        const id = chat.dataChat["_id"];
        const {name, email} = chat.dataChat;

        const content = {
            id: id,
            from: user_id,
            text: message,
            name,
            email
        };

        setMessages([...messages, ...[content]]);
        usersWebSocket.emit('send_message', (content));
    };

    useEffect(() => {
        if(userMessage.text){
            setMessages([...messages, ...[userMessage]]);
        }
    }, [userMessage]);

    useEffect(() => {
        usersWebSocket.on('reload_chat_connection', (params) => {
            console.log(params);
        });

        usersWebSocket.on('recieve_message', (params) => {
            setUserMessage(params);
        });
        
    }, []);

    useEffect(() => {

        try{
            API.get('/talk/')
        }catch(e){
            console.log(e)
        }

    }, [showChat, chat])

    return (
        <div className={`StyledChatWrapper ${nightMode && 'nightMode'}`} show={chat.showChat}>
            <div className="ChatHeader second-background">
                <CardContent>
                    <p className="primary-text"><b>{chat?.dataChat?.name}</b></p>
                    <p className="main-text" variant="subtitle2">{chat?.dataChat?.type}</p>
                </CardContent>
                <CustomButton onClick={() => handleCloseChat()} nightMode={nightMode}>
                    <Close />
                </CustomButton>
            </div>
            <MessagesWrapper className="main-background">
                {messages.map((item) => (
                    <MessageItemWrapper key={item} isYou={item.id === user_id}>
                        <MessageItem isYou={item.id === user_id}>
                            <p style={{ color: "#ffffff" }}>{item.text}</p>
                            <p>{item.name}{' '}{item.date}</p>
                        </MessageItem>
                    </MessageItemWrapper>
                ))}
            </MessagesWrapper>
            <MessageText className="second-background">
                <CustomInput
                    placeholder="Mensagem"
                    name="message"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <Tooltip title="Enviar mensagem">
                    <CustomButton nightMode={nightMode} onClick={() => submitMessage(message)} >
                        <Send />
                    </CustomButton>
                </Tooltip>
            </MessageText>
        </div>
    )
};

export const ChatBar = ({ theme }) => {

    const { showChat } = useSelector(state => state.chat);
    const { chatOnline, setChatOnline, handleDrawerOpen, API } = chatHook();
    const { nightMode } = theme;

    return (
        <>
            <CustomCard className="main-text" style={{ position: 'fixed', marginTop: '20px', minHeight: 'calc(100vh - 110px)', background: `${nightMode ? COLORS.dark1 : COLORS.light0}`, borderRadius: '20px' }}>
                <div className="CardWrapper">
                    <h6 variant="h6" style={{ color: `${nightMode ? "#fff" : "#666"}` }}>Chat</h6>
                    {chatOnline?.map((item) => (
                        <Tooltip title={item?.name} key={item.name}>
                            <div className="ChatItem" style={{ border: item.type === 'teacher' ? `3px solid #da3941` : `3px solid #39A0DA`, borderRadius: '100%' }} type={item.type} onClick={() => handleDrawerOpen(item)}>
                                {/* {item.type === 'teacher' && (
                                <School color='#fcff3a' />
                            )} */}
                                <img src={avatar} />
                            </div>
                        </Tooltip>
                    ))}
                </div>
            </CustomCard>
            {showChat && <ChatWrapper theme={theme} />}

        </>
    )
}