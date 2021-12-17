import React from "react"
import { useMoralis } from 'react-moralis'
import Home from "./Home"
import Dashboard from "./components/Dashboard"

function App() {

  const { isAuthenticated } = useMoralis();

  return isAuthenticated ? <Dashboard /> : (
    <Home />
  );
}

export default App;
