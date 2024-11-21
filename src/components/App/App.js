import React, { useState, useEffect } from "react";
import Pages from "../pages/Pages";
import { AppBar, Toolbar, Typography, CssBaseline, Container, createTheme, ThemeProvider } from "@mui/material"; // MUI kutubxonasidan kerakli komponentlarni import qilish
import "./App.css";

function App() {
  const [themeMode, setThemeMode] = useState(localStorage.getItem("theme") || "light");

  // Material-UI theme yaratish
  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
  });

  useEffect(() => {
    // Tema o'zgarganda, browserga bildirishi uchun HTML tagini yangilash
    document.documentElement.setAttribute("data-theme", themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Global CSS reset va tema sozlamalarini qo‘llash */}
      
      {/* AppBar faqatgina sarlavha bo'lib qoladi */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Material-UI Light/Dark Mode Example</Typography>
        </Toolbar>
      </AppBar>

      {/* Kontent */}
      <Container style={{ marginTop: "20px" }}>
        <Typography variant="h6" gutterBottom>
          You are in {themeMode === "light" ? "Light Mode" : "Dark Mode"}.
        </Typography>

        {/* Pages komponenti */}
      </Container>
      <Pages />

    </ThemeProvider>
  );
}

export default App;
