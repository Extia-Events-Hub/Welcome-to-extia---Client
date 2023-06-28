import React, { useState, useLayoutEffect } from "react";
import "./App.css";
import Homepage from "./containers/homepage";
import { withTranslation } from 'react-i18next';
import i18n from './i18n.jsx';
import { CookiesProvider } from "react-cookie";

function App({ t }) {
  const [format, setFormat] = useState(window.innerWidth <= 768 ? 's' : window.innerWidth <= 1154 ? 'm' : 'l');
  const [orientation, setOrientation] = useState();
  const [lng, setLng] = useState('FR');
  useLayoutEffect(() => {
    const updateSize = () => {
      setFormat(window.innerWidth <= 768 ? 's' : window.innerWidth <= 1154 ? 'm' : 'l');
      setOrientation(window.innerWidth > window.innerHeight ? 'landscape' : 'portrait');
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);


  const changeLanguage = (lngToSet) => {
    setLng(lngToSet);
    i18n.changeLanguage(lngToSet);
  }
  //require('dotenv').config()
  return (
    <CookiesProvider>
      <Homepage
        t={t}
        lngChange={changeLanguage}
        lng={lng}
        format={format}
        orientation={orientation} />
    </CookiesProvider>
  )
}

export default withTranslation()(App);
