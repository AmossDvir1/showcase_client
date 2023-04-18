import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Box } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Box className=" text-indigo-50 bg-main-bg h-screen">
    <App />
    </Box>
  </React.StrictMode>
);
