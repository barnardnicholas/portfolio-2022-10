import React, { useContext } from 'react';
import './_styles/App.scss';
import Background from './components/background/Background';
import AppContextProvider, { AppContext } from './components/context/AppContext';
// import SlideShow from './components/siteContent/SiteContent';
import SlideshowContextProvider from './components/context/SlideshowContext';
import useCustomVH from './hooks/useCustomVH';
// import useAppHeightOffset from './hooks/useAppHeightOffset';
import DarkModeButton from './components/ui/DarkModeButton';
import HomeScroll from './components/siteContent/pages/HomeScroll';

function App() {
  useCustomVH();
  // const appHeightOffset = useAppHeightOffset();
  const { isDarkMode } = useContext(AppContext);

  // const appStyles = {
  //   height: `calc(100vh - ${appHeightOffset}px)`,
  //   bottom: appHeightOffset,
  // }; // Mobile viewport height fix

  return (
    <div id="App" className={`App ${!isDarkMode ? 'theme-light' : ''}`}>
      <Background />
      <div className="gradient-overlay" />
      {/* <SlideShow /> */}
      <HomeScroll />
      <DarkModeButton />
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
