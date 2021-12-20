import React, { useState } from "react";

import "./campaign.css";

const CreateCampaign = ({ modalIsOpen, closeModal }) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [associatedLink, setAssociatedLink] = useState("");
    const [targetAmount, setTargetAmount] = useState(0.0);
    return <div className="dataForm">
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="textfield" placeholder="Title" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="textfield" placeholder="Description" />
        <input value={imageURL} onChange={(e) => setImageURL(e.target.value)} className="textfield" placeholder="Image URL" />
        <input value={associatedLink} onChange={(e) => setAssociatedLink(e.target.value)} className="textfield" placeholder="Associated Link" />
        <input type="number" value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)} className="textfield" />
        <p style={{ marginLeft: 10 }} className="donationTitle">Target Amount (in ETH): {targetAmount}</p>
        <button className="button">Submit</button>
    </div>;
}

export default CreateCampaign;