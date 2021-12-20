import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MORALIS_APP_ID, MORALIS_SERVER_URL } from "./config.js";

import { MoralisProvider } from 'react-moralis';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <MoralisProvider appId={MORALIS_APP_ID} serverUrl={MORALIS_SERVER_URL}>
    <App />
    <ToastContainer />
  </MoralisProvider>,
  document.getElementById('root')
);
