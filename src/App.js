import { use } from "chai";
import React, { useEffect } from "react"
import { useMoralis, useWeb3Transfer } from 'react-moralis'

function App() {

  const { authenticate, isAuthenticated, user, logout, Moralis } = useMoralis();
  const { fetch, error, isFetching } = useWeb3Transfer({
    amount: Moralis.Units.ETH(0.5),
    receiver: "",
    type: "native",
  });
  Moralis.enableWeb3()
  // console.log(user.id);
  // console.log(user.attributes['ethAddress']);
  console.log(error);

  return isAuthenticated ? (<div> <h2>{user.get('ethAddress')}</h2> <button onClick={() => {
    console.log('hi')
    fetch();
  }} disabled={isFetching}>Hi bro</button> <button onClick={() => {
    logout()
  }}>logout</button></div>) : (
    <div className="App">
      <button onClick={() => authenticate()}>Authenticate</button>
    </div>
  );
}

export default App;
