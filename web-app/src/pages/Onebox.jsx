import React, { useState, useEffect } from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { FaInbox, FaMailBulk, FaRegCalendarCheck, FaChartBar, FaSun, FaMoon, FaReply, FaFacebookMessenger } from 'react-icons/fa';
import styled from 'styled-components';
import axios from 'axios';

const lightTheme = {
  backgroundColor: '#fff',
  color: '#000',
  sidebarBg: '#f0f0f0',
  sidebarIconColor: '#555',
  topNavBg: '#e6e6e6',
  threadBg: '#fafafa',
  buttonBg: '#4285f4',
  buttonColor: '#fff',
};

const darkTheme = {
  backgroundColor: '#000',
  color: '#fff',
  sidebarBg: '#1a1a1a',
  sidebarIconColor: '#aaa',
  topNavBg: '#333',
  threadBg: '#333',
  buttonBg: '#4285f4',
  buttonColor: '#fff',
};

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.color};
    margin: 0;
    font-family: Arial, sans-serif;
  }
`;

const OneboxContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.div`
  width: 80px;
  background-color: ${({ theme }) => theme.sidebarBg};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
`;

const SidebarIcon = styled.div`
  font-size: 24px;
  margin: 20px 0;
  color: ${({ theme }) => theme.sidebarIconColor};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.color};
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
  background-color: ${({ theme }) => theme.topNavBg};
  border-bottom: 1px solid ${({ theme }) => theme.sidebarBg};
`;

const WorkspaceDropdown = styled.div`
  background-color: ${({ theme }) => theme.sidebarBg};
  color: ${({ theme }) => theme.color};
  padding: 10px;
  border-radius: 5px;
`;

const ThemeToggle = styled.div`
  cursor: pointer;
  font-size: 24px;
  color: ${({ theme }) => theme.color};
`;

const ThreadContainer = styled.div`
  margin-top: 20px;
`;

const ThreadItem = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  background-color: ${({ theme }) => theme.threadBg};
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.sidebarBg};
  }
`;

const ThreadDetails = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: ${({ theme }) => theme.sidebarBg};
  border-radius: 5px;
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.buttonColor};
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

const Onebox = () => {
  const [theme, setTheme] = useState('dark');
  const [fromEmail, setFromEmail] = useState('');
  const [toEmail, setToEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [bodyContent, setBodyContent] = useState('');
  const [threads, setThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [workspace] = useState('My Workspace');
  const [isMailListVisible, setIsMailListVisible] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMailFormVisible, setIsMailFormVisible] = useState(false);
  // Toggle theme between light and dark
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Fetch threads on component mount
  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const token = '•••••••';  // Make sure the token is correct
        const response = await axios.get('https://hiring.reachinbox.xyz/api/v1/onebox/list', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setThreads(response.data);
      } catch (error) {
        console.error('Error fetching threads:', error.response?.data || error.message);
      }
    };
  
    fetchThreads();
  }, []);
  

  const handleSendReply = async () => {
    if (!selectedThread) {
      console.error('No thread selected.');
      return;
    }

    try {
      const response = await axios.post(`https://hiring.reachinbox.xyz/api/v1/onebox/reply/${selectedThread.id}`, {
        from: fromEmail,
        to: toEmail,
        subject: subject,
        body: bodyContent, // Assuming the body content is HTML
      });
      console.log('Reply sent successfully:', response.data);
      setIsMailFormVisible(false); // Hide the mail form after sending
      setFromEmail('');
      setToEmail('');
      setSubject('');
      setBodyContent(''); // Clear the form after sending the reply
    } catch (error) {
      console.error('Error sending reply:', error);
    }
  };

  // Fetch details of a selected thread
  const fetchThreadDetails = async (thread_id) => {
    try {
      const token = '•••••••';  // Ensure the token is correct
      const response = await axios.get(`https://hiring.reachinbox.xyz/api/v1/onebox/messages/${thread_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSelectedThread(response.data);
      setIsMailFormVisible(false);
    } catch (error) {
      console.error('Error fetching thread details:', error.response?.data || error.message);
    }
  };
  

  // Delete a thread
  const deleteThread = async (thread_id) => {
    try {
      const token = '•••••••';  // Ensure the token is correct
      await axios.delete(`https://hiring.reachinbox.xyz/api/v1/onebox/messages/${thread_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setThreads(prevThreads => prevThreads.filter(thread => thread.id !== thread_id));
      if (selectedThread && selectedThread.id === thread_id) {
        setSelectedThread(null);
      }
    } catch (error) {
      console.error('Error deleting thread:', error.response?.data || error.message);
    }
  };
  

  const handleMailBulkClick = () => {
    setIsMailListVisible(!isMailListVisible);
  };


  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <GlobalStyle />
      <OneboxContainer>
        <Sidebar>
          <SidebarIcon onClick={() => setIsMailFormVisible(!isMailFormVisible)}><FaReply /></SidebarIcon>
          <SidebarIcon onClick={fetchThreads}><FaMailBulk /></SidebarIcon>
          <SidebarIcon><FaRegCalendarCheck /></SidebarIcon>
          <SidebarIcon><FaChartBar /></SidebarIcon>
          <SidebarIcon><FaInbox></FaInbox></SidebarIcon>
        </Sidebar>

        <MainContent>
          <TopNav>
            <WorkspaceDropdown>{workspace}</WorkspaceDropdown>
            <ThemeToggle onClick={toggleTheme}>
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </ThemeToggle>
          </TopNav>

          <ThreadContainer>
            {threads.map(thread => (
              <ThreadItem key={thread.id} onClick={() => fetchThreadDetails(thread.id)}>
                <p>{thread.subject}</p>
                <Button onClick={(e) => deleteThread(thread.id, e)}>Delete</Button>
              </ThreadItem>
            ))}
          </ThreadContainer>

          {selectedThread && (
            <ThreadDetails>
              <h2>{selectedThread.subject}</h2>
              <p>{selectedThread.body}</p>
              <Button onClick={() => setIsMailFormVisible(true)}>Reply</Button>
            </ThreadDetails>
          )}

          {isMailFormVisible && (
            <div>
              <h3>Reply to {selectedThread ? selectedThread.subject : 'New Email'}</h3>
              <input
                type="text"
                placeholder="From"
                value={fromEmail}
                onChange={(e) => setFromEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="To"
                value={toEmail}
                onChange={(e) => setToEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <textarea
                placeholder="Body"
                value={bodyContent}
                onChange={(e) => setBodyContent(e.target.value)}
              />
              <Button onClick={handleSendReply}>Send</Button>
            </div>
          )}
        </MainContent>
      </OneboxContainer>
    </ThemeProvider>
  );
};

export default Onebox;
