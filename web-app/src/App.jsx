// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
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
        <Routes>
            {/* Default route to login page */}
            <Route path="/" element={<Navigate to="/login" />} />

            {/* Login page */}
            <Route path="/login" element={<Login />} />

            {/* Onebox page (if needed for local testing or further navigation) */}
            <Route path="/onebox" element={<Onebox />} />
        </Routes>
    </Router>
);
};

export default App;
