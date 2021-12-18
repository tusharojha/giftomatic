import { Item } from "./Item";

import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react"
import { ethers } from "ethers"

import "./dashboard.css";
import ModalView from "./ModalView";
import CreateCampaign from "./CreateCampaign";
import { CONTRACT_ADDRESS } from "../credentials";

const Dashboard = () => {
  const { user, logout } = useMoralis();
  let provider
  let signer
  // const contractAddress = CONTRACT_ADDRESS

  const [modalIsOpen, setIsOpen] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  function openModal(state) {
    setShowDetailsModal(state);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

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
            openModal(false)
            // const metapass = new ethers.Contract(contractAddress, abi, signer)
            // let txn = await metapass.createCampaign(
            //   'title',
            //   'description',
            //   100,
            //   0,
            //   'image',
            //   'link',
            // )

            // await txn.wait()

            // metapass.on('campaignCreation', (res) => {
            //   console.log(res)
            // })
          }}> Create Campaign </button>
        </div>
        <br />
        <div className="items">
          <Item showDetails={() => openModal(true)} />
          <Item />
          <Item />
          <Item />
          <Item />
        </div>
      </div>
      <ModalView isDetails={showDetailsModal} modalIsOpen={modalIsOpen} closeModal={() => closeModal()} />
    </div>
  );
};

export default Dashboard;
