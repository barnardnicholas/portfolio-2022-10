import React, { useContext } from 'react';
import './_styles/App.scss';
import Background from './components/background/Background';
import AppContextProvider, { AppContext } from './components/context/AppContext';
import SlideShow from './components/siteContent/SiteContent';
import SlideshowContextProvider from './components/context/SlideshowContext';

function App() {
  const { isDarkMode } = useContext(AppContext);
  return (
    <div className={`App ${!isDarkMode ? 'theme-light' : ''}`}>
      <Background />
      {/* <h1>BACKGROUND TESTS</h1>
      <button className="button" type="button" onClick={toggleDarkMode}>
        Dark Mode
      </button> */}
      <SlideShow />
    </div>
  );
}

function AppContainer() {
  return (
    <AppContextProvider>
      <SlideshowContextProvider>
        <App />
      </SlideshowContextProvider>
    </AppContextProvider>
  );
}

export default AppContainer;
