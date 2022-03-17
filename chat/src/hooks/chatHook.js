import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socketIOClient from "socket.io-client";
import { API } from '../services/api';

const endpoint = "http://localhost:8081"

const chatHook = () => {
  const dispatch = useDispatch();
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

  useEffect(() => {
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => {
      setResponse(data);
    });
  }, []);

  useEffect(() => {
    handleChatOnline();
  }, []);

  return {
    chatOnline,
    setChatOnline,
    handleDrawerOpen
  }
}

export default chatHook;