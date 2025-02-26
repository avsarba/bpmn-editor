import React from 'react';

function GatewayPropertyPanel({ element, onChange }) {
  return (
    <div className="property-group">
      <div className="property-group-title">Gateway Properties</div>
      
      <div className="property-row">
        <label className="property-label">Name</label>
        <input 
          className="property-input" 
          value={element.data.label || ''} 
          onChange={(e) => onChange('label', e.target.value)} 
        />
      </div>
      
      <div className="property-row">
        <label className="property-label">Gateway Type</label>
        <select 
          className="property-input"
          value={element.data.gatewayType || 'exclusive'}
          onChange={(e) => onChange('gatewayType', e.target.value)}
        >
          <option value="exclusive">Exclusive Gateway</option>
          <option value="parallel">Parallel Gateway</option>
          <option value="inclusive">Inclusive Gateway</option>
        </select>
      </div>
    </div>
  );
}

export default GatewayPropertyPanel;
