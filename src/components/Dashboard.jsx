import { Item } from "./Item";

import { useMoralis } from "react-moralis";
import { useEffect } from "react"
import { ethers } from "ethers"
import abi from "./../abi/abi.json"

import "./dashboard.css";
import { CONTRACT_ADDRESS } from "../credentials";

const Dashboard = () => {
  const { user, logout } = useMoralis();
  let provider
  let signer
  const contractAddress = CONTRACT_ADDRESS
  useEffect(() => {
    provider = new ethers.providers.Web3Provider(window.ethereum)
    signer = provider.getSigner()
    console.log(signer)
  }, [])

  return (
    <div className="container">
      <div className="navbar">
        <div className="logo">
          <a href="/">GiftoMatic</a>
        </div>
        <div className="userDetails">
          <h5>{user.get('ethAddress')}</h5>
          <button className="button" onClick={async () => {
            logout()
          }}>
            Logout
          </button>
        </div>
      </div>
      <hr />
      <div className="list">
        <div className="title">

          <h2 className="heading">Your Campaigns</h2>

          <button className="button" onClick={async () => {
            const metapass = new ethers.Contract(contractAddress, abi, signer)
            let txn = await metapass.createCampaign(
              'title',
              'description',
              100,
              0,
              'image',
              'link',
            )

            await txn.wait()

            metapass.on('campaignCreation', (res) => {
              console.log(res)
            })
          }} disabled> Create Campaign </button>
        </div>
        <br />
        <div className="items">
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
