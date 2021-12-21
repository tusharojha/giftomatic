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

  return !isAuthenticated ? <Home /> : <Router>
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
  </Router>;
}

export default App;
