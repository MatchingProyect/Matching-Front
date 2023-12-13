import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Provider } from 'react-redux';

const theme = createTheme();

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme = {theme}>
  <BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  </BrowserRouter>
  </ThemeProvider>  
)
