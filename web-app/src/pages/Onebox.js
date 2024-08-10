// src/pages/Onebox.js
import React, { useState, useEffect } from 'react';
import { fetchOneboxList, fetchThread, deleteThread } from '../api'; // Import functions
import './Onebox.css';

const Onebox = () => {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const loadThreads = async () => {
      try {
        const data = await fetchOneboxList();
        setThreads(data);
      } catch (error) {
        console.error('Error fetching threads:', error);
      }
    };

    loadThreads();
  }, []);

  const handleDelete = async (threadId) => {
    try {
      await deleteThread(threadId);
      setThreads(threads.filter(thread => thread.id !== threadId));
    } catch (error) {
      console.error('Error deleting thread:', error);
    }
  };

  return (
    <div>
      {/* Render threads */}
    </div>
  );
};

export default Onebox;
