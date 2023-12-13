import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Provider } from 'react-redux';
import {store} from './redux/store.js';

const theme = createTheme();

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store = {store}>
  <ThemeProvider theme = {theme}>
  <BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </BrowserRouter>
  </ThemeProvider>
  </Provider>
);


