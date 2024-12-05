import React, { useState, useEffect } from "react";
import Pages from "../pages/Pages";
import "./App.css";
import {TokenProvider} from '../register/TokenProvider/TokenContext'

function App() {
  return (
    <TokenProvider>
      <Pages />
    </TokenProvider>
  );
}

export default App;
