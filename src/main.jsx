import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import axios from 'axios';

const theme = createTheme();

axios.defaults.baseURL = 'postgres://matching_db_wl28_user:f8XXqdrmkeMNj2jdt99wme0gYqBuWVCW@dpg-clud6t0l5elc73eh0cc0-a/matching_db_wl28';
// axios.defaults.baseURL = 'http://localhost:3000';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store = {store}>
      <ThemeProvider theme = {theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);


