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
<<<<<<< HEAD
  <BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  </BrowserRouter>
  </ThemeProvider>
  </Provider>
);
=======
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </ThemeProvider>  
)
>>>>>>> 0745a43770123f00ca4b691fd2ffa875b50947c3
