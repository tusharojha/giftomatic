import React from "react";
import Web3 from "web3";
import { toast } from "react-toastify";

import Progressbar from "./ProgressBar";
import { useMoralis } from "react-moralis";

const Details = ({ selectedId, campaign, closeModal }) => {
    const completed = (parseInt(campaign['targetAmount']) <= parseInt(campaign['collectedAmount']));
    const progress = (parseInt(campaign['collectedAmount']) / parseInt(campaign['targetAmount'])) * 100;

    const { user } = useMoralis();

    return <div className="container left">
        <h5 className="donationTitle">{campaign['title']}
            {completed ? <div className="status completed">Completed</div> : <div className="status running">Running</div>}
            <button className="button" onClick={() => {
                navigator.clipboard.writeText(window.location.href + user.get('ethAddress') + '/' + (selectedId + 1));
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