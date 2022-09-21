import React, { useContext } from 'react';
import './_styles/App.scss';
import Background from './components/background/Background';
import AppContextProvider, { AppContext } from './components/context/AppContext';

function App() {
  const { isDarkMode, toggleDarkMode } = useContext(AppContext);
  return (
    <div className={`App ${!isDarkMode ? 'theme-light' : ''}`}>
      <Background />
      <h1>BACKGROUND TESTS</h1>
      <button className="button" type="button" onClick={toggleDarkMode}>
        Dark Mode
      </button>
    </div>
  );
}

function AppContainer() {
  return (
    <AppContextProvider>
      <App />
    </AppContextProvider>
  );
}

export default AppContainer;
