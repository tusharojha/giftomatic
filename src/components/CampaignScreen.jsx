import React, { useEffect, useState } from "react"
import { useMoralis } from "react-moralis";
import { useParams } from "react-router-dom";
import Web3 from "web3";
import { toast } from "react-toastify";

import Progressbar from "./ProgressBar";
import abi from "./../abi/abi.json";
import { CONTRACT_ADDRESS } from "../config";
import Header from "./Header";

const CampaignScreen = () => {

    const { userToken, id } = useParams();
    const { user, logout, Moralis } = useMoralis();

    const [loading, setLoading] = useState(true);
    const [campaign, setCampaign] = useState(null);
    const [error, setError] = useState('')
    const fetchCampaign = async () => {
        await Moralis.enableWeb3();
        const options = {
            contractAddress: CONTRACT_ADDRESS,
            functionName: "viewCampaign",
            abi: abi,
            params: {
                owner: userToken,
                _id: id,
            }
        };
        try {
            const receipt = await Moralis.executeFunction(options);
            console.log(receipt);
            if (receipt !== undefined) {
                setCampaign(receipt)
                setLoading(false)
            }
        } catch (e) {
            console.log(e.message);
            setError(e.message);
        }
    }

    useEffect(() => {
        fetchCampaign();
    }, [])

    return <div className="container">
        <Header />
        {error !== '' ? error : loading ? <h2 className="heading">Loading...</h2> : <DonateScreen refresh={() => fetchCampaign()} campaign={campaign} />}
    </div>
}

const DonateScreen = ({ campaign, refresh }) => {
    const completed = (parseInt(campaign['targetAmount']) <= parseInt(campaign['collectedAmount']));
    const progress = (parseInt(campaign['collectedAmount']) / parseInt(campaign['targetAmount'])) * 100;

    const [amount, setAmount] = useState(0.0);
    const { Moralis } = useMoralis();
    const { userToken, id } = useParams();

    const donate = async () => {
        await Moralis.enableWeb3();
        const val = Web3.utils.toWei(amount, 'ether');
        const options = {
            contractAddress: CONTRACT_ADDRESS,
            functionName: "addGift",
            abi: abi,
            msgValue: val,
            params: {
                owner: userToken,
                _id: id,
            }
        };
        try {
            const receipt = await Moralis.executeFunction(options);
            console.log(receipt);
            if (receipt !== undefined) {
                toast("Thanks for your donation!");
                refresh();
            }
        } catch (e) {
            console.log(e.message);
            toast(e.message);
        }
    }

    return <div>
        <h1 className="donationTitle">{campaign['title']}
            {completed ? <div style={{ fontSize: '12px' }} className="status completed">Completed</div> : <div style={{ fontSize: '12px' }} className="status running">Running</div>}
        </h1>
        <Progressbar bgcolor="red" progress={progress} height={25} />
        <h4 className="heading">{Web3.utils.fromWei(campaign['collectedAmount'], 'ether')} ETH collected out of {Web3.utils.fromWei(campaign['targetAmount'])} ETH target.</h4>
        <p className="donationDescription">
            {campaign['description']}
        </p>
        <a className="link" href={campaign['manualLink']}>Associated Link</a><br /> <br />
        <img alt="" height={200} width={200} src={campaign['image']} /> <br />
        <p style={{ fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}> Enter amount to donate in ETH: </p><input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" className="textfield" />
        <button className="button" onClick={() => donate()}>Donate</button>
    </div>;
};

export default CampaignScreen;