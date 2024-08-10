// src/api.js
export const login = async (credentials) => {
  // Implement the login functionality
  return fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  }).then(response => response.json());
};

export const fetchOneboxData = async () => {
  // Implement fetching data for Onebox
  return fetch('/api/onebox/list').then(response => response.json());
};

export const sendReply = async (replyData) => {
  // Implement sending a reply
  return fetch(`/api/reply/${replyData.thread_id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(replyData),
  }).then(response => response.json());
};

// src/api.js

export const fetchOneboxList = async () => {
  const response = await fetch('/api/onebox/list');
  if (!response.ok) {
    throw new Error('Network response was not ok.');
  }
  return response.json();
};

export const fetchThread = async (threadId) => {
  const response = await fetch(`/api/onebox/${threadId}`);
  if (!response.ok) {
    throw new Error('Network response was not ok.');
  }
  return response.json();
};

export const deleteThread = async (threadId) => {
  const response = await fetch(`/api/onebox/${threadId}`, { method: 'DELETE' });
  if (!response.ok) {
    throw new Error('Network response was not ok.');
  }
  return response.json();
};
