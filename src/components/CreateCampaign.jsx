import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import Web3 from "web3";

import { CONTRACT_ADDRESS } from "../config";
import abi from "./../abi/abi.json"

import "./campaign.css";

const CreateCampaign = ({ closeModal }) => {

    const { Moralis } = useMoralis();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [associatedLink, setAssociatedLink] = useState("");
    const [targetAmount, setTargetAmount] = useState(0.0);

    const createCamp = async () => {
        await Moralis.enableWeb3();
        const options = {
            contractAddress: CONTRACT_ADDRESS,
            functionName: "createCampaign",
            abi: abi,
            params: {
                _title: title,
                _description: description,
                _targetAmount: Web3.utils.toWei(targetAmount, 'ether'),
                _image: imageURL,
                _link: associatedLink,
            }
        };
        try {
            const receipt = await Moralis.executeFunction(options);
            if (receipt !== undefined) {
                console.log(receipt['events']['campaignCreation']['returnValues'])
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