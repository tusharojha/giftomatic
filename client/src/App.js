import React, { useState, useEffect } from "react";
import Web3 from "web3";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import Home from './Home';
import Dashboard from './components/Dashboard/Dashboard';
import CampaignScreen from './components/Campaign/CampaignScreen';

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function initWeb3() {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    if (typeof accounts[0] !== 'undefined') {
      setIsAuthenticated(true)
    }
  }

  useEffect(() => {
    initWeb3();
  }, []);

  return (!isAuthenticated ? <Home setIsAuthenticated={(i) => setIsAuthenticated(i)} /> : <Router>
    <Switch>
      <Route path={`/:userToken/:id`}>
        <CampaignScreen />
      </Route>
      <Route path={`/:userToken`}>
        <Dashboard otherUser={true} />
      </Route>
      <Route path="/">
        <Dashboard otherUser={false} />
      </Route>
    </Switch>

    <ToastContainer />
  </Router>);
}

export default App;
