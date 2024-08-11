import React from 'react';

const ThreadItem = ({ children, onClick }) => {
  return (
    <div className="thread-item" onClick={onClick}>
      {children}
    </div>
  );
};

export default ThreadItem;
