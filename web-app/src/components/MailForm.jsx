import React, { useState } from 'react';

const MailForm = ({ onSubmit, onCancel }) => {
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(recipient, subject, body);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>To:</label>
        <input type="email" value={recipient} onChange={(e) => setRecipient(e.target.value)} required />
      </div>
      <div>
        <label>Subject:</label>
        <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required />
      </div>
      <div>
        <label>Message:</label>
        <textarea value={body} onChange={(e) => setBody(e.target.value)} required />
      </div>
      <div>
        <button type="submit">Send</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default MailForm;
