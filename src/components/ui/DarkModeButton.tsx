import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

function DarkModeButton() {
  const { isDarkMode, toggleDarkMode } = useContext(AppContext);

  return (
    <button type="button" className="dark-mode-button" onClick={toggleDarkMode} tabIndex={0}>
      <i className={`fa fa-${isDarkMode ? 'sun' : 'moon'}`} />
    </button>
  );
}

export default DarkModeButton;
