// src/components/Header.js
import React from 'react';
import './Header.css'; // Add styles if needed

const Header = ({ onToggleTheme, currentTheme }) => {
  return (
    <header className="header">
      <h1>ReachInbox</h1>
      <button onClick={onToggleTheme}>
        Switch to {currentTheme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </header>
  );
};

export default Header;
