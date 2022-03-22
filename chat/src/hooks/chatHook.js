import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socketIOClient from "socket.io-client";
import { API, getUserIdInStorage } from '../services/api';

import { UsersWebSocket } from '../websocket/user';

let usersWebSocket = new UsersWebSocket();

const chatHook = () => {
  const dispatch = useDispatch();
  const user_id = getUserIdInStorage();
  const [chatOnline, setChatOnline] = useState([]);

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
    user_id,
    API
  }
}

export default chatHook;