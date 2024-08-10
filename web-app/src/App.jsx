// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Onebox from './pages/Onebox';
import Reply from './pages/Reply';
import './theme';
import './App.css';

function App() {
  const [currentTheme, setCurrentTheme] = useState('light');

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <div className={`app ${currentTheme}`}>
        <Header onToggleTheme={toggleTheme} currentTheme={currentTheme} />
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/onebox" element={<Onebox />} />
            <Route path="/reply" element={<Reply />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
