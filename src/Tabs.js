import React, { useState } from 'react';
import './Tabs.css';

const Tabs = ({ groups, selectedGroup, setSelectedGroup, handleAddGroup }) => {
  const [showInput, setShowInput] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');

  // Function to handle the form submission to add a new group
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newGroupName.trim() !== '') {
      handleAddGroup(newGroupName);
      setNewGroupName('');
      setShowInput(false);  // Hide the input after group is added
    }
  };

  return (
    <div className="tabs">
      {groups.map((group, index) => (
        <button
          key={index}
          className={`tab ${selectedGroup === group ? 'active' : ''}`}
          onClick={() => setSelectedGroup(group)}
        >
          {group}
        </button>
      ))}
      
      {/* Add new group button */}
      <button className="tab add-group-btn" onClick={() => setShowInput(true)}>
        +
      </button>

      {/* Input field to add a new group */}
      {showInput && (
        <form onSubmit={handleSubmit} className="new-group-form">
          <input
            type="text"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            placeholder="New group name"
          />
          <button type="submit">Add</button>
        </form>
      )}
    </div>
  );
};

export default Tabs;
