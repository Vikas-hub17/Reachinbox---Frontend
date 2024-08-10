// src/pages/Reply.js
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { sendReply } from '../api';
import 'react-quill/dist/quill.snow.css';

function Reply({ threadId }) {
  const [editorContent, setEditorContent] = useState('');
  const [replyTo, setReplyTo] = useState('');
  const [replySubject, setReplySubject] = useState('');

  const handleSendReply = async () => {
    try {
      await sendReply(threadId, {
        from: 'your_email@example.com',
        to: replyTo,
        subject: replySubject,
        body: editorContent,
      });
      // Reset form or show success message
    } catch (error) {
      console.error('Failed to send reply:', error);
    }
  };

  return (
    <div className="reply-container">
      <input type="email" placeholder="To" value={replyTo} onChange={(e) => setReplyTo(e.target.value)} />
      <input type="text" placeholder="Subject" value={replySubject} onChange={(e) => setReplySubject(e.target.value)} />
      <ReactQuill value={editorContent} onChange={setEditorContent} />
      <button onClick={handleSendReply}>Send</button>
    </div>
  );
}

export default Reply;
