import React from "react"
import { useMoralis } from 'react-moralis'

function App() {

  const { authenticate, isAuthenticated, user } = useMoralis();
  console.log(user.id);
  console.log(user.attributes['ethAddress']);
  return isAuthenticated ? (<div> <h1>Hi bro</h1></div>) : (
    <div className="App">
      <button onClick={() => authenticate()}>Authenticate</button>
    </div>
  );
}

export default App;
