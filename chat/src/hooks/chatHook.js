import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socketIOClient from "socket.io-client";
import { API, getUserIdInStorage, getUserDataInStorage } from '../services/api';

import { UsersWebSocket } from '../websocket/user';

let usersWebSocket = new UsersWebSocket();

const chatHook = () => {
  const dispatch = useDispatch();
  const chat = useSelector(state => state.chat);
  const { showChat } = useSelector(state => state.chat);

  const user_id = getUserIdInStorage();
  const user_data = getUserDataInStorage();
  const [chatOnline, setChatOnline] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [message, setMessage] = useState([]);
  const [messages, setMessages] = useState([]);
  const [showUserWriting, setShowUserWriting] = useState(false);


  const handleChatOnline = async () => {
    try {
      const usersOnline = await API.get('/usersOnline');
      setChatOnline(usersOnline.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDrawerOpen = (chat) => {
    dispatch({ type: 'SET_CHAT', chat: { showChat: true, dataChat: chat } });
    // setOpen(true);
  };

  const [response, setResponse] = useState("");

  // useEffect(() => {
  //   const socket = socketIOClient(endpoint);
  //   socket.on("FromAPI", data => {
  //     setResponse(data);
  //   });
  // }, []);

  const handleCloseChat = () => {
    dispatch({ type: 'SET_CHAT', chat: { showChat: false, dataChat: {} } });
};

  const submitMessage = (message) => {
      const id = chat.dataChat["_id"];
      const {name, email} = user_data;

      const content = {
          id: id,
          from_id: user_id,
          text: message,
          name,
          email
      };

      setMessages([...messages, ...[content]]);
      usersWebSocket.emit('send_message', (content));
  };

  const getTalk = async () => {
      const to_id = chat?.dataChat["_id"];
      const from_id = user_id;
      try{
          const {data} = await API.get(`/talk/${from_id}/${to_id}`);
          setMessages(data);
      }catch(e){
          console.log(e)
      }
  }

  const filterChatOnline = chatOnline?.filter((item) => {return item["_id"] !== user_id })



  const userIsWriting = (value) => {
    if(value.length > 5){
      const {dataChat} = chat;
      const remove = true;

      // setTimeout(() => {
      //   usersWebSocket.emit('user_is_writing', dataChat)
      // }, 1000);
  
      // setTimeout(() => {
      //   usersWebSocket.emit('user_is_writing', {dataChat, remove})
      //   clearInterval(timeout);
      // }, 1000);
    }
  }


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

      usersWebSocket.on('user_writing', (params) => {
        setShowUserWriting(true);
        console.log(params);
      })
      
  }, []);

  useEffect(() => {
      getTalk();
  }, [chat])

  useEffect(() => {

    usersWebSocket.emit('user_connected', ({ user_id }));

    usersWebSocket.on('reload_users_online', (params) => {
      handleChatOnline();
    });

    return () => {
      usersWebSocket.emit('user_disconnected', ({ user_id }));
    }

  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      usersWebSocket.emit('reload_connection', { reload: true })
    });
  }, []);

  useEffect(() => {
    handleChatOnline();
  }, []);

  return {
    usersWebSocket,
    chatOnline,
    setChatOnline,
    handleDrawerOpen,
    submitMessage,
    handleCloseChat,
    user_id,
    user_data,
    API,
    userMessage,
    setUserMessage,
    chat,
    message,
    setMessage,
    messages,
    setMessages,
    showChat,
    filterChatOnline,
    userIsWriting,
    showUserWriting, 
    setShowUserWriting
  }
}

export default chatHook;