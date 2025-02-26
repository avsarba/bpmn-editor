import React, { createContext, useContext, useState } from 'react';
import createEditorStore from './editorStore';

const EditorContext = createContext(null);

export function EditorProvider({ children }) {
  // Create store only once
  const [store] = useState(() => createEditorStore());
  
  return (
    <EditorContext.Provider value={store}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const store = useContext(EditorContext);
  if (!store) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return store;
}
