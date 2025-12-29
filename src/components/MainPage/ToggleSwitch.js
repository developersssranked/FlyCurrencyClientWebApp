// ToggleSwitch.jsx
import { useState } from 'react';
import '../../css/MainPage/toggle_switch.css'

const ToggleSwitch = ({activeOption, setActiveOption}) => {

  const handleToggle = (option) => {
    setActiveOption(option);
  };

  return (
    <div className="toggle-container">
      <button
        className={`toggle-button ${activeOption === 'THB' ? 'active' : ''}`}
        onClick={() => handleToggle('THB')}
      >
        THB
      </button>
      <button
        className={`toggle-button ${activeOption === 'VND' ? 'active' : ''}`}
        onClick={() => handleToggle('VND')}
      >
        VND
      </button>
    </div>
  );
};

export default ToggleSwitch;