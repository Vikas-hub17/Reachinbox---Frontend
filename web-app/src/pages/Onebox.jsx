import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Onebox.css'; // Add styling as per Figma

const Onebox = () => {
    const [threads, setThreads] = useState([]);
    const [selectedThread, setSelectedThread] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch Onebox list on component mount
    useEffect(() => {
        fetchOneboxList();
    }, []);

    // Fetch the list of threads
    const fetchOneboxList = async () => {
        try {
            const response = await axios.get('/onebox/list');
            setThreads(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching the onebox list:", error);
            setIsLoading(false);
        }
    };

    // Fetch individual thread details
    const fetchThread = async (threadId) => {
        try {
            const response = await axios.get(`/onebox/${threadId}`);
            setSelectedThread(response.data);
        } catch (error) {
            console.error("Error fetching the thread:", error);
        }
    };

    // Delete a thread
    const deleteThread = async (threadId) => {
        try {
            await axios.delete(`/onebox/${threadId}`);
            fetchOneboxList(); // Refresh the list after deletion
        } catch (error) {
            console.error("Error deleting the thread:", error);
        }
    };

    // Handle keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'D' && selectedThread) {
                deleteThread(selectedThread.id);
            }
            if (event.key === 'R' && selectedThread) {
                // Logic to open reply box can be implemented here
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedThread]);

    return (
        <div className="onebox-container">
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className="threads-list">
                    {threads.map((thread) => (
                        <div key={thread.id} className="thread-item" onClick={() => fetchThread(thread.id)}>
                            <h3>{thread.subject}</h3>
                            <p>{thread.snippet}</p>
                        </div>
                    ))}
                </div>
            )}
            {selectedThread && (
                <div className="thread-details">
                    <h2>{selectedThread.subject}</h2>
                    <p>{selectedThread.body}</p>
                    {/* Implement reply functionality here */}
                </div>
            )}
        </div>
    );
};

export default Onebox;
