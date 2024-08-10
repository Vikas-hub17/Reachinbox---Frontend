// src/components/ReplyForm.js
import React, { useState } from 'react';
import './ReplyForm.css'; // Add styles if needed
import TextEditor from './TextEditor'; // Ensure TextEditor component is correctly implemented

const ReplyForm = ({ threadId, onSendReply }) => {
  const [emailFrom, setEmailFrom] = useState('');
  const [emailTo, setEmailTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSendReply({ from: emailFrom, to: emailTo, subject, body });
  };

  return (
    <form onSubmit={handleSubmit} className="reply-form">
      <label>
        From:
        <input type="email" value={emailFrom} onChange={(e) => setEmailFrom(e.target.value)} required />
      </label>
      <label>
        To:
        <input type="email" value={emailTo} onChange={(e) => setEmailTo(e.target.value)} required />
      </label>
      <label>
        Subject:
        <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required />
      </label>
      <TextEditor value={body} onChange={setBody} />
      <button type="submit">Send</button>
    </form>
  );
};

export default ReplyForm;
