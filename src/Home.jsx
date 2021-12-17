import { Button } from "reactstrap";

import gift1 from "./assets/gift1.png";
import "./App.css"

import { useMoralis } from 'react-moralis'

const Home = () => {
  const { authenticate } = useMoralis();
  return (
    <div className="container">
      <img src={gift1} alt="" />
      <h1 className="heading">Welcome to GiftoMatic</h1>
      <p className="description">The decentralised way to create donation campaigns. </p>
      <Button
        className="button"
        onClick={() => authenticate()}
      >
        Connect Wallet
      </Button>
    </div>
  );
};

export default Home;
