// src/pages/Onebox.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomTextEditor from '../components/TextEditor';

const Onebox = () => {
    const [threads, setThreads] = useState([]);
    const [selectedThread, setSelectedThread] = useState(null);

    useEffect(() => {
        // Fetch threads data on page load
        axios.get('/api/onebox/list')
            .then(response => {
                setThreads(response.data);
            })
            .catch(error => console.error('Error fetching threads:', error));
    }, []);

    const handleDeleteThread = (threadId) => {
        axios.delete(`/api/onebox/${threadId}`)
            .then(() => {
                setThreads(threads.filter(thread => thread.id !== threadId));
            })
            .catch(error => console.error('Error deleting thread:', error));
    };

    const handleReply = (threadId, replyData) => {
        axios.post(`/api/reply/${threadId}`, replyData)
            .then(response => {
                console.log('Reply sent:', response.data);
            })
            .catch(error => console.error('Error sending reply:', error));
    };

    const handleKeyDown = (event) => {
        if (event.key === 'D') {
            if (selectedThread) {
                handleDeleteThread(selectedThread.id);
            }
        } else if (event.key === 'R') {
            if (selectedThread) {
                // Open reply box (This could be a modal or inline editor)
            }
        }
    };

    return (
        <div className="onebox-container" onKeyDown={handleKeyDown} tabIndex="0">
            {/* Render thread list and other components here */}
            <CustomTextEditor onSave={(content) => handleReply(selectedThread.id, content)} />
        </div>
    );
};

export default Onebox;
