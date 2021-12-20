import React from "react"
import { useMoralis } from 'react-moralis'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from "./Home"
import Dashboard from "./components/Dashboard"
import CampaignScreen from "./components/CampaignScreen";

function App() {

  const { isAuthenticated } = useMoralis();

  return <Router>
    <Switch>
      <Route path={`/:userToken/:id`}>
        {isAuthenticated ? <CampaignScreen /> : (
          <Home />
        )}
      </Route>
      <Route path="/">
        {isAuthenticated ? <Dashboard /> : (
          <Home />
        )}
      </Route>
    </Switch>
  </Router>;
}

export default App;
