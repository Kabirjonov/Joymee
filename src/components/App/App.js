import React, { useState, useEffect } from "react";
import Pages from "../pages/Pages";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from "react-toastify";
import {LanguageProvider }from'../changeLanguage/changer'
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import 'react-loading-skeleton/dist/skeleton.css';


function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      easing: 'ease-in-out', // Easing function
      once: true, // Whether animation should happen only once - while scrolling down
    });
  }, []);
  return (
    <LanguageProvider>
    <ToastContainer/>
      <Pages />
    </LanguageProvider>
   
  );
}
export default App;
