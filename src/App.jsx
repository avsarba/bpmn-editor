import React, { useState } from 'react';
import { EditorProvider } from './core/EditorContext';
import EditorLayout from './components/EditorLayout';
import BPMNEditor from './editors/BPMNEditor';

function App() {
  const [currentEditor, setCurrentEditor] = useState('bpmn');
  
  const renderEditor = () => {
    switch (currentEditor) {
      case 'bpmn':
        return <BPMNEditor />;
      // Future editors will be added here
      default:
        return <BPMNEditor />;
    }
  };

  return (
    <EditorProvider>
      <EditorLayout>
        {renderEditor()}
      </EditorLayout>
    </EditorProvider>
  );
}

export default App;
