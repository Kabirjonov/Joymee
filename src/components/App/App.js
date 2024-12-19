import React, { useState, useEffect } from "react";
import Pages from "../pages/Pages";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from "react-toastify";
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';




function App() {
  
  return (
    <>
    <ToastContainer/>
      <Pages />
    </>
  );
}
export default App;
