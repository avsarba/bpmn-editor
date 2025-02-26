import React from 'react';
import { useEditor } from '../core/EditorContext';

function EditorLayout({ children }) {
  return (
    <div className="editor-container">
      {children}
    </div>
  );
}

export default EditorLayout;
