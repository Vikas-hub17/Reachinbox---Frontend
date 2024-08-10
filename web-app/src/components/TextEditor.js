// src/components/TextEditor.js
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

function TextEditor({ value, onChange, onSave, onAddVariable }) {
  const [editorContent, setEditorContent] = useState(value || '');

  const handleChange = (content) => {
    setEditorContent(content);
    onChange && onChange(content);
  };

  const handleSave = () => {
    onSave && onSave(editorContent);
  };

  const handleAddVariable = () => {
    onAddVariable && onAddVariable();
  };

  return (
    <div className="text-editor-container">
      <div className="text-editor-toolbar">
        <button onClick={handleSave}>Save</button>
        <button onClick={handleAddVariable}>Add Variable</button>
      </div>
      <ReactQuill
        value={editorContent}
        onChange={handleChange}
        modules={editorModules}
        formats={editorFormats}
      />
    </div>
  );
}

// Define Quill editor modules and formats
const editorModules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline'],
    [{ align: [] }],
    ['link', 'image'],
    ['clean'],
  ],
};

const editorFormats = [
  'header', 'font', 'list', 'bullet', 'bold', 'italic', 'underline',
  'align', 'link', 'image',
];

export default TextEditor;
