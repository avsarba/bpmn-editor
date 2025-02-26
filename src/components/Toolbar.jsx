import React from 'react';
import { useEditor } from '../core/EditorContext';

function Toolbar() {
  const { clearDiagram, exportDiagram, importDiagram } = useEditor();
  
  const handleExport = () => {
    const diagram = exportDiagram();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(diagram));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "diagram.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };
  
  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const diagram = JSON.parse(event.target.result);
          importDiagram(diagram);
        } catch (err) {
          console.error('Failed to parse diagram file', err);
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };
  
  return (
    <div className="toolbar">
      <button onClick={clearDiagram}>Clear</button>
      <button onClick={handleExport}>Export</button>
      <button onClick={handleImport}>Import</button>
    </div>
  );
}

export default Toolbar;
