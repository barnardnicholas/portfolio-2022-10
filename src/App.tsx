import React, { useContext } from 'react';
import './_styles/App.scss';
import Background from './components/background/Background';
import AppContextProvider, { AppContext } from './components/context/AppContext';
import SlideShow from './components/siteContent/SiteContent';
import SlideshowContextProvider from './components/context/SlideshowContext';
import useCustomVH from './hooks/useCustomVH';

function App() {
  useCustomVH();
  const { isDarkMode } = useContext(AppContext);
  return (
    <div className={`App ${!isDarkMode ? 'theme-light' : ''}`}>
      <Background />
      <div className="gradient-overlay" />
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
