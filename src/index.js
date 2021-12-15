import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MORALIS_APP_ID, MORALIS_SERVER_URL } from "./credentials.js";

import { MoralisProvider } from 'react-moralis';

ReactDOM.render(
  <MoralisProvider appId={MORALIS_APP_ID} serverUrl={MORALIS_SERVER_URL}>
    <App />
  </MoralisProvider>,
  document.getElementById('root')
);
