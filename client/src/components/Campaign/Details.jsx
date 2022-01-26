import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { toast } from "react-toastify";

import Progressbar from "../extras/ProgressBar";

const Details = ({ selectedId, campaign, closeModal }) => {
    const completed = (parseInt(campaign['targetAmount']) <= parseInt(campaign['collectedAmount']));
    const progress = (parseInt(campaign['collectedAmount']) / parseInt(campaign['targetAmount'])) * 100;

    // const { user } = useMoralis();
    const [user, setUser] = useState(null);

    const fetchUser = async () => {
        const web3 = new Web3(window.ethereum);
        const userId = (await web3.eth.getAccounts())[0];
        setUser(userId);
    };
    useEffect(() => {
        fetchUser()
    }, [])

    return <div className="container left">
        <h5 className="donationTitle">{campaign['title']}
            {completed ? <div className="status completed">Completed</div> : <div className="status running">Running</div>}
            <button className="button" onClick={() => {
                navigator.clipboard.writeText(window.location.href + user + '/' + (selectedId + 1));
                toast('Link copied to clipboard');
                closeModal()
            }}>Share Link</button>
        </h5>
        <Progressbar bgcolor="red" progress={progress} height={25} />
        <h4 className="heading">{Web3.utils.fromWei(campaign['collectedAmount'])} ETH collected out of {Web3.utils.fromWei(campaign['targetAmount'])} ETH target.</h4>
        <p className="donationDescription">
            {campaign['description']}
        </p>
        <img alt="" height={200} width={200} src={campaign['image']} />
        <a className="link" href={campaign['manualLink']}>Associated Link</a>
    </div>;
}

export default Details;