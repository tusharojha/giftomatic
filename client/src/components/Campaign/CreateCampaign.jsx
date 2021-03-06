import React, { useState } from "react";
import Web3 from "web3";

import abi from "../../abi/Gift.json"

import "./campaign.css";

const CreateCampaign = ({ closeModal }) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [associatedLink, setAssociatedLink] = useState("");
    const [targetAmount, setTargetAmount] = useState(0.0);

    const web3 = new Web3(window.ethereum);

    const createCamp = async () => {
        const contract = new web3.eth.Contract(abi.abi, abi.networks[await web3.eth.net.getId()].address)

        const userId = (await web3.eth.getAccounts())[0];
        const receipt = await contract.methods.createCampaign(title, description, Web3.utils.toWei(targetAmount, 'ether'), imageURL, associatedLink).send({ from: userId })
        console.log(receipt)
        try {
            if (receipt !== undefined) {
                console.log(receipt['events']['CampaignCreated']['returnValues'])
                closeModal()
            }
        } catch (e) {
            console.log(e);
        }
    };

    return <div className="dataForm">
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="textfield" placeholder="Title" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="textfield" placeholder="Description" />
        <input value={imageURL} onChange={(e) => setImageURL(e.target.value)} className="textfield" placeholder="Image URL" />
        <input value={associatedLink} onChange={(e) => setAssociatedLink(e.target.value)} className="textfield" placeholder="Associated Link" />
        <input type="number" value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)} className="textfield" />
        <p style={{ marginLeft: 10 }} className="donationTitle">Target Amount (in ETH): {targetAmount}</p>
        <button onClick={() => createCamp()} className="button">Submit</button>
    </div>;
}

export default CreateCampaign;