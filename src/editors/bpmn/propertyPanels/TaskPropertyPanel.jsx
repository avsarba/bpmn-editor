import React from 'react';

function TaskPropertyPanel({ element, onChange }) {
  return (
    <div className="property-group">
      <div className="property-group-title">Task Properties</div>
      
      <div className="property-row">
        <label className="property-label">Name</label>
        <input 
          className="property-input" 
          value={element.data.label || ''} 
          onChange={(e) => onChange('label', e.target.value)} 
        />
      </div>
      
      <div className="property-row">
        <label className="property-label">Task Type</label>
        <select 
          className="property-input"
          value={element.data.taskType || 'default'}
          onChange={(e) => onChange('taskType', e.target.value)}
        >
          <option value="default">Default</option>
          <option value="user">User Task</option>
          <option value="service">Service Task</option>
          <option value="script">Script Task</option>
        </select>
      </div>
    </div>
  );
}

export default TaskPropertyPanel;
