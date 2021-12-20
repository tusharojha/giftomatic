import React, { useEffect, useState } from "react"
import { useMoralis } from "react-moralis";
import { useParams } from "react-router-dom";

import abi from "./../abi/abi.json";
import Details from "./Details";
import { CONTRACT_ADDRESS } from "../credentials";

const CampaignScreen = () => {

    const { userToken, id } = useParams();
    const { user, logout, Moralis } = useMoralis();

    const [loading, setLoading] = useState(true);
    const [campaign, setCampaign] = useState(null);
    const [error, setError] = useState('')

    console.log(userToken, id)

    useEffect(() => {
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
                if (receipt !== undefined) {
                    setLoading(true)
                    setCampaign(receipt)
                }
            } catch (e) {
                console.log(e.message);
                setError(e.message);
            }
        }
        fetchCampaign();
    }, [])

    return <div className="container">
        <div className="navbar">
            <div className="logo">
                <a href="/">GiftoMatic</a>
            </div>
            <div className="userDetails">
                <h5>{user.get('ethAddress')}</h5>
                <button className="button" onClick={async () => {
                    logout()
                }}>
                    Logout
                </button>
            </div>
        </div>
        {error !== '' ? <p>{error}</p> : loading ? <h2 className="heading">Loading...</h2> : <Details campaign={campaign} />}
    </div>
}

export default CampaignScreen;