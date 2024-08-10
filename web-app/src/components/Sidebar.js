// src/components/Sidebar.js
import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul className="sidebar-menu">
        <li><a href="#inbox">Inbox</a></li>
        <li><a href="#sent">Sent</a></li>
        <li><a href="#drafts">Drafts</a></li>
        <li><a href="#trash">Trash</a></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
