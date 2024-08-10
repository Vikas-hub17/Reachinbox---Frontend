// src/components/Sidebar.js
import React from 'react';
import './Sidebar.css'; // Add styles if needed

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li><a href="/onebox">Onebox</a></li>
          <li><a href="/reply">Reply</a></li>
          {/* Add more navigation items as needed */}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
