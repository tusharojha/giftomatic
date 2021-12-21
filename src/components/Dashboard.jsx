import { Item } from "./Item";

import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react"
import Modal from 'react-modal';
import { useParams } from "react-router";

import "./dashboard.css";
import Header from "./Header";
import ModalView from "./ModalView";
import abi from "../abi/abi.json";
import { toast } from "react-toastify";
import { CONTRACT_ADDRESS } from "../config";

const Dashboard = ({ otherUser }) => {
  const { user, logout, Moralis } = useMoralis();
  const { userToken } = useParams();

  const [selectedId, setSelectedId] = useState(-1);
  const [campaigns, setCampaigns] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const userTokenId = otherUser ? userToken : user.get('ethAddress');

  Modal.setAppElement('body');

  const loadAllCampaigns = async () => {
    await Moralis.enableWeb3();
    const options = {
      contractAddress: CONTRACT_ADDRESS,
      functionName: "getAllCampaigns",
      abi: abi,
      params: {
        owner: userTokenId
      }
    };
    try {
      const receipt = await Moralis.executeFunction(options);
      if (receipt !== undefined)
        setCampaigns(receipt)
    } catch (e) {
      console.log(e);
      toast('Unable to connect with Network!');
    }
  }

  function openModal(state, data) {
    setSelectedCampaign(data);
    setShowDetailsModal(state);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    loadAllCampaigns()
  }

  useEffect(() => {
    loadAllCampaigns()
  }, [])

  return (
    <div className="container">
      <Header />
      <hr />
      <div className="list">
        <div className="title">

          {otherUser ? <h4 className="heading"> {userToken}'s Campaigns </h4> : <h2 className="heading"> Your Campaigns</h2>}

          {otherUser ? <div></div> : <button className="button" onClick={async () => {
            openModal(false, null);
          }}> Create Campaign </button>}
        </div>
        <br />
        <div className="items">
          {campaigns.length === 0 ? <div style={{ marginLeft: 5 }}><h3 className="heading">No Campaigns</h3></div> : campaigns.map((item, index) => {
            return <Item isMe={!otherUser} key={index} item={item} showDetails={() => {
              if (otherUser) {
                window.location.href = window.location.protocol + '/' + userTokenId + '/' + (index + 1);
              } else {
                setSelectedId(index);
                openModal(true, item);
              }
            }} />;
          })}
        </div>
      </div>
      <ModalView selectedId={selectedId} selectedCampaign={selectedCampaign} isDetails={showDetailsModal} modalIsOpen={modalIsOpen} closeModal={() => closeModal()} />
    </div>
  );
};

export default Dashboard;
