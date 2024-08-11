import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Assuming these components already exist
import ThreadContainer from '../components/ThreadContainer';
import ThreadItem from '../components/ThreadItem';
import ThreadDetails from '../components/ThreadDetails';
import MailForm from '../components/MailForm';

const Onebox = () => {
  const [threads, setThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [isMailFormVisible, setIsMailFormVisible] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const tokenFromUrl = new URLSearchParams(window.location.search).get('token');
    if (tokenFromUrl) {
      localStorage.setItem('authToken', tokenFromUrl);
      setToken(tokenFromUrl);
    } else {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        setToken(storedToken);
      } else {
        googleLogin();
      }
    }
  }, []);

  const googleLogin = () => {
    window.location.href = "https://hiring.reachinbox.xyz/api/v1/auth/google-login?redirect_to=http://your-frontend.com";
  };

  useEffect(() => {
    if (token) {
      fetchEmailThreads();
    }
  }, [token]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (selectedThread) {
        if (event.key === 'd' || event.key === 'D') {
          deleteThread(selectedThread.id);
        } else if (event.key === 'r' || event.key === 'R') {
          setIsMailFormVisible(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [selectedThread]);

  const fetchEmailThreads = async () => {
    try {
      const response = await axios.get('https://hiring.reachinbox.xyz/api/v1/onebox/list', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setThreads(response.data);
    } catch (error) {
      console.error('Error fetching email threads:', error);
    }
  };

  const fetchThreadDetails = async (thread_id) => {
    try {
      const response = await axios.get(`https://hiring.reachinbox.xyz/api/v1/onebox/messages/${thread_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSelectedThread(response.data);
      setIsMailFormVisible(false);
    } catch (error) {
      console.error('Error fetching thread details:', error);
    }
  };

  const deleteThread = async (thread_id) => {
    try {
      await axios.delete(`https://hiring.reachinbox.xyz/api/v1/onebox/messages/${thread_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setThreads(prevThreads => prevThreads.filter(thread => thread.id !== thread_id));
      setSelectedThread(null);
    } catch (error) {
      console.error('Error deleting thread:', error);
    }
  };

  const sendReply = async (thread_id, { recipient, subject, body }) => {
    try {
      const response = await axios.post(`https://hiring.reachinbox.xyz/api/v1/onebox/reply/${thread_id}`, {
        recipient,
        subject,
        body,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Reply sent successfully:', response.data);
      fetchThreadDetails(thread_id); 
    } catch (error) {
      console.error('Error sending reply:', error);
    }
  };

  const resetOnebox = async () => {
    try {
      await axios.get('https://hiring.reachinbox.xyz/api/v1/onebox/reset', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchEmailThreads(); 
      setSelectedThread(null);
    } catch (error) {
      console.error('Error resetting onebox:', error);
    }
  };

  return (
    <OneboxContainer>
      <Sidebar>
        <ResetButton onClick={resetOnebox}>Reset Onebox</ResetButton>
        <ThreadContainer>
          {threads.map(thread => (
            <ThreadItem key={thread.id} onClick={() => fetchThreadDetails(thread.id)}>
              <ThreadSubject>{thread.subject}</ThreadSubject>
              <DeleteButton
                onClick={(e) => {
                  e.stopPropagation();
                  deleteThread(thread.id);
                }}>
                Delete
              </DeleteButton>
            </ThreadItem>
          ))}
        </ThreadContainer>
      </Sidebar>

      <MainContent>
        {selectedThread ? (
          <>
            <ThreadDetails>
              <h2>{selectedThread.subject}</h2>
              {selectedThread.messages.map(message => (
                <Message key={message.id}>
                  <p>{message.body}</p>
                </Message>
              ))}
            </ThreadDetails>
            <ReplyButton
              onClick={() => setIsMailFormVisible(true)}>
              Reply
            </ReplyButton>
          </>
        ) : (
          <NoThreadSelected>No thread selected</NoThreadSelected>
        )}

        {isMailFormVisible && (
          <MailForm
            onSubmit={(recipient, subject, body) => sendReply(selectedThread.id, { recipient, subject, body })}
            onCancel={() => setIsMailFormVisible(false)}
          />
        )}
      </MainContent>
    </OneboxContainer>
  );
};

export default Onebox;

// Styled Components
const OneboxContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.div`
  width: 300px;
  background-color: #f4f4f4;
  padding: 10px;
  overflow-y: auto;
`;

const ResetButton = styled.button`
  margin-bottom: 20px;
  width: 100%;
  padding: 10px;
  background-color: #d9534f;
  color: white;
  border: none;
  cursor: pointer;
`;

const ThreadSubject = styled.p`
  margin: 0;
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  color: red;
  cursor: pointer;
  font-size: 14px;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #ffffff;
  overflow-y: auto;
`;

const NoThreadSelected = styled.p`
  text-align: center;
  color: #888;
`;

const ReplyButton = styled.button`
  display: block;
  margin-top: 20px;
  background-color: #337ab7;
  color: white;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
`;

const Message = styled.div`
  margin-bottom: 10px;
`;
