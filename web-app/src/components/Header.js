// src/components/Header.js
import React from 'react';

const Header = ({ onToggleTheme, currentTheme }) => {
  return (
    <header className="header" style={{backgroundColor: '#f8f9fa', padding:1}}>
      <h1>ReachInbox</h1>
      <button onClick={onToggleTheme}>
        Switch to {currentTheme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </header>
  );
};

export default Header;
