// src/components/CustomTextEditor.jsx

import React from 'react';

const CustomTextEditor = ({ onSave }) => {
    const handleSave = () => {
        const content = "<html>Your edited content</html>";
        onSave(content);
    };

    return (
        <div className="text-editor">
            <div className="editor-toolbar">
                <button onClick={handleSave}>SAVE</button>
                <button>Variables</button>
            </div>
            {/* Text editor area here */}
        </div>
    );
};

export default CustomTextEditor;
