import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ToolbarButton = styled.button`
  margin-right: 10px;
  padding: 5px 10px;
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #357ae8;
  }
`;

const CustomTextEditor = ({ onSave, onVariableInsert }) => {
  const [editorContent, setEditorContent] = useState('');

  const handleSave = () => {
    onSave(editorContent);
  };

  const handleInsertVariable = () => {
    const variablePlaceholder = '{variable}';
    setEditorContent(editorContent + variablePlaceholder);
  };

  return (
    <EditorContainer>
      <div style={{ marginBottom: '10px' }}>
        <ToolbarButton onClick={handleSave}>SAVE</ToolbarButton>
        <ToolbarButton onClick={handleInsertVariable}>Variables</ToolbarButton>
      </div>
      <ReactQuill 
        value={editorContent} 
        onChange={setEditorContent}
        modules={{
          toolbar: false, // Disable default toolbar if you only want custom buttons
        }}
        style={{ width: '100%', minHeight: '200px', backgroundColor: 'white', color: 'black' }}
      />
    </EditorContainer>
  );
};

export default CustomTextEditor;
