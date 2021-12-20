import React from "react";
import Web3 from "web3";

import Progressbar from "./ProgressBar";

const Details = ({ campaign }) => {
    const completed = (parseInt(campaign['targetAmount']) <= parseInt(campaign['collectedAmount']));
    const progress = (parseInt(campaign['collectedAmount']) / parseInt(campaign['targetAmount'])) * 100;
    return <div className="container left">
        <h5 className="donationTitle">{campaign['title']}
            {completed ? <div className="status completed">Completed</div> : <div className="status running">Running</div>}
            <button className="button" onClick={() => { }}>Share Link</button>
        </h5>
        <Progressbar bgcolor="red" progress={progress} height={25} />
        <h4 className="heading">{Web3.utils.fromWei(campaign['collectedAmount'])} ETH collected out of {Web3.utils.fromWei(campaign['targetAmount'])} ETH target.</h4>
        <p className="donationDescription">
            {campaign['description']}
        </p>
        <img height={200} width={200} src={campaign['image']} />
        <a className="link" href={campaign['manualLink']}>Associated Link</a>
    </div>;
}

export default Details;