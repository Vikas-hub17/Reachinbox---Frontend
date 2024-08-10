// src/components/Sidebar.js
import React from 'react';

const Sidebar = () => {
  return (
    <aside className="sidebar" style={{width:250, backgroundColor: '#343a40', color:'#ffffff'}}>
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
