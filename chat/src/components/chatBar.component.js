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
    justify-content: ${props => props.isYou ?  'flex-end' : 'flex-start'};
`

const MessageItem = styled('div')`
    background: ${props => props.isYou ? '#da3941' : '#aaa'};
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

`;

const MobileCustomCard = styled('div')`
    position: fixed;
    margin-tpo: 20px;
    min-height: calc(100vh - 110px);
    background: ${props => props.nightMode ? COLORS.dark1 : COLORS.light0};
    border-radius: 20px;
    @media(max-width: 980px){
        width: 100%;
        max-height: 60px;
        min-height: inherit;
        bottom: 0px;
        border-radius: 0px;
    }
`;

const MobileCardWrapper = styled('div')`
    @media(max-width: 980px){
        flex-direction: row !important;
        justify-content: flex-start !important;
        gap: 10px;
        align-items: center !important;
    }
`;

const MobileChatItem = styled('div')`
    border: 3px solid transparent;
    border-color: ${props => props.type === 'teacher' ? '#da3941' : '#39A0DA'};
    border-radius: 100%;
    @media(max-width: 980px){
        margin-top: 0px !important;
        width: 30px !important;
    }
`;

const MobileStyledChatWrapper = styled('div')`
    @media(max-width: 980px){
        z-index: 1000 !important;
        right: 23px !important;
        box-shadow: 0px 0px 6px rgba(0,0,0,0.5);
        bottom: 60px !important;
    }
` 

export const ChatWrapper = ({ theme }) => {
    const { nightMode } = theme;
    const {
        // usersWebSocket,
        user_id,
        // API,
        user_data,
        submitMessage,
        handleCloseChat,
        // userMessage,
        // setUserMessage,
        chat,
        message,
        setMessage,
        messages,
        userIsWriting,
        showUserWriting        // setMessages
    } = chatHook();

    return (
        <MobileStyledChatWrapper className={`StyledChatWrapper ${nightMode && 'nightMode'}`} show={chat.showChat}>
            <div className="ChatHeader second-background">
                <CardContent>
                    <p className="primary-text"><b>{chat?.dataChat?.name}</b></p>
                    <p className="main-text" variant="subtitle2">{chat?.dataChat?.type}</p>
                </CardContent>
                <CustomButton onClick={() => handleCloseChat()} nightMode={nightMode}>
                    <Close />
                </CustomButton>
            </div>
            <MessagesWrapper className="main-background" id="message-wrapper">
                {messages.map((item) => (
                    <MessageItemWrapper key={item} isYou={item.from_id === user_id }>
                        <MessageItem isYou={item.from_id === user_id}>
                            <p style={{ color: "#ffffff" }}>{item.text}</p>
                            <p>{item.from_id === user_id ? user_data.name : chat?.dataChat?.name}{' '}{item.date}</p>
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
                    onChange={(e) => {
                        setMessage(e.target.value);
                        userIsWriting(e.target.value);
                    }}
                />
                <Tooltip title="Enviar mensagem">
                    <CustomButton nightMode={nightMode} onClick={() => submitMessage(message)} >
                        <Send />
                    </CustomButton>
                </Tooltip>
            </MessageText>
        </MobileStyledChatWrapper>
    )
};

export const ChatBar = ({ theme }) => {

    // const { showChat } = useSelector(state => state.chat);
    const { nightMode } = theme;
    
    const {
        // chatOnline,
        // setChatOnline,
        handleDrawerOpen,
        showChat,
        // API,
        // user_id,
        filterChatOnline
    } = chatHook();

    // const filterChatOnline = chatOnline?.filter((item) => {return item["_id"] !== user_id })

    return (
        <>
            <MobileCustomCard className="main-text" nightMode={nightMode}>
                <MobileCardWrapper className="CardWrapper">
                    <h6 variant="h6" style={{ color: `${nightMode ? "#fff" : "#666"}` }}>Chat</h6>

                    {filterChatOnline?.map((item) => (
                        <Tooltip title={item?.name} key={item?.name}>
                            <MobileChatItem className="ChatItem" type={item.type} onClick={() => handleDrawerOpen(item)}>
                                <img src={avatar} />
                            </MobileChatItem>
                        </Tooltip>
                    ))}
                </MobileCardWrapper>
            </MobileCustomCard>
            {showChat && <ChatWrapper theme={theme} />}

        </>
    )
}