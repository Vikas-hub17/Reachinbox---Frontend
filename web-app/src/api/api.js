// src/api.js
import axios from 'axios';

const API_BASE_URL = 'https://documenter.getpostman.com/view/30630244/2sA2rCTMKr#433eb613-e405-4239-9e2d-f20485b31b27'; // Replace with actual base URL

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API Endpoints
export const loginUser = (credentials) => api.post('/login', credentials);

export const fetchOneboxList = () => api.get('/onebox/list');

export const fetchThread = (threadId) => api.get(`/onebox/${threadId}`);

export const deleteThread = (threadId) => api.delete(`/onebox/${threadId}`);

export const sendReply = (threadId, replyData) => api.post(`/reply/${threadId}`, replyData);
