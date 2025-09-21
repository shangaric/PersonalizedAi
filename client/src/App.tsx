import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';

// Components
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import CareerExplorer from './components/CareerExplorer';
import LearningRoadmap from './components/LearningRoadmap';
import Profile from './components/Profile';
import ChatBot from './components/ChatBot';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/explore" element={<CareerExplorer />} />
              <Route path="/roadmap" element={<LearningRoadmap />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Box>
          <ChatBot />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;