// src/components/Header.js
import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <h1 className="header-title">ReachInbox</h1>
      <nav className="header-nav">
        <a href="#home">Home</a>
        <a href="#profile">Profile</a>
        <a href="#settings">Settings</a>
      </nav>
    </header>
  );
};

export default Header;
