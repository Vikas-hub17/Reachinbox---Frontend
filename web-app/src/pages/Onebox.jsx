import React, { useState, useEffect } from 'react';
import { FaInbox, FaMailBulk, FaRegCalendarCheck, FaChartBar } from 'react-icons/fa';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const OneboxContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #000; /* Dark background */
  color: #fff; /* White text */
`;

const Sidebar = styled.div`
  width: 80px;
  background-color: #1a1a1a; /* Darker sidebar */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
`;

const SidebarIcon = styled.div`
  font-size: 24px;
  margin: 20px 0;
  color: #aaa; /* Icon color */
  &:hover {
    color: #fff; /* Hover effect */
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
  justify-content: flex-end;
  align-items: center;
  padding: 10px 20px;
  background-color: #333;
  border-bottom: 1px solid #444;
`;

const WorkspaceDropdown = styled.div`
  background-color: #1a1a1a;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
`;

const CenterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  text-align: center;
`;

const CenterImage = styled.img`
  width: 150px;
  height: 150px;
  margin-bottom: 20px;
`;

const CenterText = styled.h2`
  font-size: 18px;
  color: #fff;
`;

const SubText = styled.p`
  font-size: 14px;
  color: #bbb;
`;

const Onebox = () => {
  const [threads, setThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [workspace] = useState('My Workspace');
  
  useEffect(() => {
    axios.get('https://documenter.getpostman.com/view/30630244/2sA2rCTMKr#433eb613-e405-4239-9e2d-f20485b31b27/onebox/list')
        .then(response => {
            setThreads(response.data);
        })
        .catch(error => {
            console.error('Error fetching threads:', error);
        });
}, []);

const fetchThreadDetails = (thread_id) => {
    axios.get(`https://documenter.getpostman.com/view/30630244/2sA2rCTMKr#433eb613-e405-4239-9e2d-f20485b31b27/onebox/${thread_id}`)
        .then(response => {
            setSelectedThread(response.data);
        })
        .catch(error => {
            console.error('Error fetching thread details:', error);
        });
};

const deleteThread = (thread_id) => {
    axios.delete(`https://documenter.getpostman.com/view/30630244/2sA2rCTMKr#433eb613-e405-4239-9e2d-f20485b31b27/onebox/${thread_id}`)
        .then(response => {
            setThreads(prevThreads => prevThreads.filter(thread => thread.id !== thread_id));
        })
        .catch(error => {
            console.error('Error deleting thread:', error);
        });
};

  return (
    <OneboxContainer>
           <div>
    <div>
        {threads.map(thread => (
            <div key={thread.id} onClick={() => fetchThreadDetails(thread.id)}>
                <p>{thread.subject}</p>
                <button onClick={() => deleteThread(thread.id)}>Delete</button>
            </div>
        ))}
    </div>
    <div>
        {selectedThread && (
            <div>
                <h2>{selectedThread.subject}</h2>
                <p>{selectedThread.body}</p>
            </div>
        )}
    </div>
</div>

      <Sidebar>
        <SidebarIcon><FaInbox /></SidebarIcon>
        <SidebarIcon><FaMailBulk /></SidebarIcon>
        <SidebarIcon><FaRegCalendarCheck /></SidebarIcon>
        <SidebarIcon><FaChartBar /></SidebarIcon>
      </Sidebar>

      <MainContent>
        <TopNav>
          <WorkspaceDropdown>{workspace}</WorkspaceDropdown>
        </TopNav>
        <CenterContent>
          <CenterImage src="path_to_center_image.png" alt="center-img" />
          <CenterText>It's the beginning of a legendary sales pipeline</CenterText>
          <SubText>When you have inbound emails you will see them here</SubText>
        </CenterContent>
      </MainContent>
    </OneboxContainer>
  );
};

export default Onebox;
