import React from 'react';

function EventPropertyPanel({ element, onChange }) {
  return (
    <div className="property-group">
      <div className="property-group-title">Event Properties</div>
      
      <div className="property-row">
        <label className="property-label">Name</label>
        <input 
          className="property-input" 
          value={element.data.label || ''} 
          onChange={(e) => onChange('label', e.target.value)} 
        />
      </div>
      
      <div className="property-row">
        <label className="property-label">Event Type</label>
        <select 
          className="property-input"
          value={element.data.eventType || 'start'}
          onChange={(e) => onChange('eventType', e.target.value)}
        >
          <option value="start">Start Event</option>
          <option value="end">End Event</option>
          <option value="intermediate">Intermediate Event</option>
        </select>
      </div>
    </div>
  );
}

export default EventPropertyPanel;
