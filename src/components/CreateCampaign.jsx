import React, { useState } from "react";

import "./campaign.css";

const CreateCampaign = ({ modalIsOpen, closeModal }) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [associatedLink, setAssociatedLink] = useState("");
    const [targetAmount, setTargetAmount] = useState(0.0);

    return <div className="dataForm">
        <input value={title} onChange={(e) => setTitle(e.value)} className="textfield" placeholder="Title" />
        <textarea value={description} onChange={(e) => setDescription(e.value)} className="textfield" placeholder="Description" />
        <input value={imageURL} onChange={(e) => setImageURL(e.value)} className="textfield" placeholder="Image URL" />
        <input value={associatedLink} onChange={(e) => setAssociatedLink(e.value)} className="textfield" placeholder="Associated Link" />
        <input type="number" value={targetAmount} onChange={(e) => setTargetAmount(e.value)} className="textfield" placeholder="Target Amount (in ETH)" />
        <button className="button">Submit</button>
    </div>;
}

export default CreateCampaign;