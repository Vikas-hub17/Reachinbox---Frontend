// src/pages/Onebox.js
import React, { useEffect, useState } from 'react';
// src/pages/Onebox.js
import { fetchOneboxData } from '../api'; // Ensure the path is correct


function Onebox() {
  const [threads, setThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);

  useEffect(() => {
    const loadThreads = async () => {
      try {
        const response = await fetchOneboxList();
        setThreads(response.data);
      } catch (error) {
        console.error('Failed to fetch threads:', error);
      }
    };

    loadThreads();
  }, []);

  const handleSelectThread = async (threadId) => {
    try {
      const response = await fetchThread(threadId);
      setSelectedThread(response.data);
    } catch (error) {
      console.error('Failed to fetch thread:', error);
    }
  };

  const handleDeleteThread = async (threadId) => {
    try {
      await deleteThread(threadId);
      setThreads((prev) => prev.filter((thread) => thread.id !== threadId));
    } catch (error) {
      console.error('Failed to delete thread:', error);
    }
  };

  return (
    <div className="onebox-container">
      <ul>
        {threads.map((thread) => (
          <li key={thread.id} onClick={() => handleSelectThread(thread.id)}>
            {thread.subject}
            <button onClick={() => handleDeleteThread(thread.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {selectedThread && <div>{selectedThread.body}</div>}
    </div>
  );
}

export default Onebox;
