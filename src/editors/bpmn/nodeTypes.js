import React from 'react';

// This file will register all BPMN node types with the editor
export function registerBPMNNodeTypes(registerNodeType, registerPropertyPanel) {
  // Register node types
  registerNodeType('task', {
    label: 'Task',
    create: (position) => ({
      type: 'task',
      data: { label: 'Task' },
      position,
    }),
    paletteInfo: {
      group: 'Activities',
      icon: '□',
      label: 'Task',
    }
  });
  
  registerNodeType('event', {
    label: 'Event',
    create: (position) => ({
      type: 'event',
      data: { label: 'Event', eventType: 'start' },
      position,
    }),
    paletteInfo: {
      group: 'Events',
      icon: '⚫',
      label: 'Event',
    }
  });
  
  registerNodeType('gateway', {
    label: 'Gateway',
    create: (position) => ({
      type: 'gateway',
      data: { label: 'Gateway', gatewayType: 'exclusive' },
      position,
    }),
    paletteInfo: {
      group: 'Gateways',
      icon: '◇',
      label: 'Gateway',
    }
  });
  
  // Register property panels - we'll import these from separate files
  // instead of defining them here to avoid JSX in .js files
  registerPropertyPanel('task', TaskPropertyPanel);
  registerPropertyPanel('event', EventPropertyPanel);
  registerPropertyPanel('gateway', GatewayPropertyPanel);
}

// Import property panels instead of defining them inline
import TaskPropertyPanel from './propertyPanels/TaskPropertyPanel';
import EventPropertyPanel from './propertyPanels/EventPropertyPanel';
import GatewayPropertyPanel from './propertyPanels/GatewayPropertyPanel';
