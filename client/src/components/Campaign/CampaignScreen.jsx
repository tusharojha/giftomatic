import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import Web3 from "web3";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Progressbar from "../extras/ProgressBar";
import abi from "../../abi/Gift.json";
import Header from "../Header/Header";

const CampaignScreen = () => {

    const { userToken, id } = useParams();

    const [loading, setLoading] = useState(true);
    const [campaign, setCampaign] = useState(null);
    const [error, setError] = useState('')
    const fetchCampaign = async () => {

        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(abi.abi, abi.networks[await web3.eth.net.getId()].address);
        const receipt = await contract.methods.getCampaign(userToken, id - 1).call();

        try {
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
    const { userToken, id } = useParams();
    const donate = async () => {

        try {
            const web3 = new Web3(window.ethereum);
            const contract = new web3.eth.Contract(abi.abi, abi.networks[await web3.eth.net.getId()].address);
            const accountId = (await web3.eth.getAccounts())[0];
            const val = Web3.utils.toWei(amount, 'ether');
            const receipt = await contract.methods.gift(userToken, id - 1).send({ from: accountId, value: val });

            console.log(receipt);
            if (receipt !== undefined) {
                toast("Thanks for your donation!");
                refresh();
            }
        } catch (e) {
            toast(e.message);
            console.log(e.message);
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

        <ToastContainer />
    </div>;
};

export default CampaignScreen;