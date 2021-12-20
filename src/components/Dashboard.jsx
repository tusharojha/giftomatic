import { Item } from "./Item";

import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react"
import Modal from 'react-modal';

import "./dashboard.css";
import ModalView from "./ModalView";
import abi from "../abi/abi.json";
// import CreateCampaign from "./CreateCampaign";
import { CONTRACT_ADDRESS } from "../credentials";

const Dashboard = () => {
  const { user, logout, Moralis } = useMoralis();
  const contractAddress = CONTRACT_ADDRESS;

  const [campaigns, setCampaigns] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  Modal.setAppElement('body');

  function openModal(state, data) {
    setSelectedCampaign(data);
    setShowDetailsModal(state);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    const loadAllCampaigns = async () => {
      await Moralis.enableWeb3();
      const options = {
        contractAddress: CONTRACT_ADDRESS,
        functionName: "getAllCampaigns",
        abi: abi,
        params: {
          owner: user.get('ethAddress')
        }
      };
      try {

        const receipt = await Moralis.executeFunction(options);
        if (receipt !== undefined)
          setCampaigns(receipt)
      } catch (e) {
        console.log(e);
      }
    }
    loadAllCampaigns()
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
            openModal(false, null);
          }}> Create Campaign </button>
        </div>
        <br />
        <div className="items">
          {campaigns.map((item, index) => {
            return <Item key={index} item={item} showDetails={() => openModal(true, item)} />;
          })}
        </div>
      </div>
      <ModalView selectedCampaign={selectedCampaign} isDetails={showDetailsModal} modalIsOpen={modalIsOpen} closeModal={() => closeModal()} />
    </div>
  );
};

export default Dashboard;
