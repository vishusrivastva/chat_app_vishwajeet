import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await api.post('/auth/login', userData);
  return response.data;
};

export const sendMessage = async (messageData, token) => {
  const response = await api.post('/chat/send', messageData, {
    headers: { Authorization: token },
  });
  return response.data;
};

export const getMessages = async (token) => {
  const response = await api.get('/chat/messages', {
    headers: { Authorization: token },
  });
  return response.data;
};
