import React, { useState, useEffect } from 'react';
import { FaInbox, FaMailBulk, FaRegCalendarCheck, FaChartBar } from 'react-icons/fa';
import styled from 'styled-components';
import axios from 'axios';

const OneboxContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${(props) => (props.isDarkMode ? '#000' : '#fff')};
  color: ${(props) => (props.isDarkMode ? '#fff' : '#000')};
`;

const Sidebar = styled.div`
  width: 80px;
  background-color: ${(props) => (props.isDarkMode ? '#1a1a1a' : '#f0f0f0')};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
`;

const SidebarIcon = styled.div`
  font-size: 24px;
  margin: 20px 0;
  color: ${(props) => (props.isDarkMode ? '#aaa' : '#555')};
  cursor: pointer;
  &:hover {
    color: ${(props) => (props.isDarkMode ? '#fff' : '#000')};
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const TopNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: ${(props) => (props.isDarkMode ? '#333' : '#e0e0e0')};
  border-bottom: 1px solid ${(props) => (props.isDarkMode ? '#444' : '#ccc')};
`;

const WorkspaceDropdown = styled.div`
  background-color: ${(props) => (props.isDarkMode ? '#1a1a1a' : '#f0f0f0')};
  color: ${(props) => (props.isDarkMode ? '#fff' : '#000')};
  padding: 10px;
  border-radius: 5px;
`;

const ThreadContainer = styled.div`
  margin-top: 20px;
`;

const ThreadItem = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  background-color: ${(props) => (props.isDarkMode ? '#333' : '#f9f9f9')};
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background-color: ${(props) => (props.isDarkMode ? '#444' : '#ddd')};
  }
`;

const ThreadDetails = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: ${(props) => (props.isDarkMode ? '#1a1a1a' : '#f0f0f0')};
  border-radius: 5px;
`;

const Button = styled.button`
  background-color: #4285f4;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

const Onebox = () => {
  const [fromEmail, setFromEmail] = useState('');
  const [toEmail, setToEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [bodyContent, setBodyContent] = useState('');
  const [threads, setThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [workspace] = useState('My Workspace');
  const [isMailFormVisible, setIsMailFormVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isMailListVisible, setIsMailListVisible] = useState(false);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        setLoading(true);
        const token = '•••••••';
        const response = await axios.get('https://hiring.reachinbox.xyz/api/v1/onebox/list', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setThreads(response.data);
      } catch (error) {
        setError('Error fetching threads.');
        console.error('Error fetching threads:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchThreads();
  }, []);

  const handleSendReply = async () => {
    try {
      const response = await axios.post(`https://hiring.reachinbox.xyz/api/v1/onebox/reply/${selectedThread.id}`, {
        from: fromEmail,
        to: toEmail,
        subject: subject,
        body: bodyContent,
      });
      console.log('Reply sent successfully:', response.data);
      setIsMailFormVisible(false);
    } catch (error) {
      setError('Error sending reply.');
      console.error('Error sending reply:', error);
    }
  };

  const fetchThreadDetails = async (thread_id) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://hiring.reachinbox.xyz/api/v1/onebox/messages/${thread_id}`);
      setSelectedThread(response.data);
      setIsMailFormVisible(false);
    } catch (error) {
      setError('Error fetching thread details.');
      console.error('Error fetching thread details:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteThread = async (thread_id) => {
    try {
      await axios.delete(`https://hiring.reachinbox.xyz/api/v1/onebox/messages/${thread_id}`);
      setThreads((prevThreads) => prevThreads.filter((thread) => thread.id !== thread_id));
      if (selectedThread && selectedThread.id === thread_id) {
        setSelectedThread(null);
      }
    } catch (error) {
      setError('Error deleting thread.');
      console.error('Error deleting thread:', error);
    }
  };

  const handleMailBulkClick = () => {
    setIsMailListVisible(!isMailListVisible);
  };

  return (
    <OneboxContainer isDarkMode={isDarkMode}>
      <Sidebar isDarkMode={isDarkMode}>
        <SidebarIcon onClick={() => setIsMailFormVisible(!isMailFormVisible)}><FaInbox /></SidebarIcon>
        <SidebarIcon onClick={handleMailBulkClick}><FaMailBulk /></SidebarIcon>
        <SidebarIcon><FaRegCalendarCheck /></SidebarIcon>
        <SidebarIcon><FaChartBar /></SidebarIcon>
      </Sidebar>

      <MainContent>
        <TopNav isDarkMode={isDarkMode}>
          <div>
            <WorkspaceDropdown isDarkMode={isDarkMode}>{workspace}</WorkspaceDropdown>
          </div>
          <div>
            <label>
              <input type="checkbox" checked={isDarkMode} onChange={() => setIsDarkMode(!isDarkMode)} />
              {isDarkMode ? '🌙' : '🌞'}
            </label>
          </div>
        </TopNav>

        {isMailListVisible && (
          <ThreadContainer>
            {loading && <p>Loading threads...</p>}
            {error && <p>{error}</p>}
            {threads.map((thread) => (
              <ThreadItem key={thread.id} onClick={() => fetchThreadDetails(thread.id)} isDarkMode={isDarkMode}>
                <p>{thread.subject}</p>
                <Button onClick={(e) => { e.stopPropagation(); deleteThread(thread.id); }}>Delete</Button>
              </ThreadItem>
            ))}
          </ThreadContainer>
        )}

        {selectedThread && (
          <ThreadDetails isDarkMode={isDarkMode}>
            <h2>{selectedThread.subject}</h2>
            <p>{selectedThread.body}</p>
            <Button onClick={() => setIsMailFormVisible(true)}>Reply</Button>
          </ThreadDetails>
        )}
      </MainContent>
    </OneboxContainer>
  );
};

export default Onebox;
