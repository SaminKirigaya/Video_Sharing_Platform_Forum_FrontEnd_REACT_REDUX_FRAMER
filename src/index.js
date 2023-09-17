import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import Header from './Common/Header';
import reportWebVitals from './reportWebVitals';
import './Asset/Css/mainHeart.css'
import axios from 'axios';
import { Provider } from 'react-redux';
import Store from './Store/Store';

axios.defaults.baseURL = 'http://localhost:8000'; // backend restapi base location



const root = ReactDOM.createRoot(document.getElementById('root'));



root.render(
  
  
  <React.StrictMode>
    <Provider store={Store}><Header /></Provider>
  </React.StrictMode>
);


reportWebVitals();
