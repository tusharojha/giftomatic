import React, { useState, useEffect } from "react";
import Web3 from "web3";

import abi from '../../abi/Gift.json';

const Header = () => {


    const web3 = new Web3(window.ethereum);
    const [account, setAccount] = useState('0x0');
    const [balance, setBalance] = useState('0');

    useEffect(() => {
        const fetchUser = async () => {
            const netId = await web3.eth.net.getId();
            if (abi.networks[netId] === undefined) {
                alert('Please connect to the Polygon testnet.');
                return;
            }
            const accounts = await web3.eth.getAccounts();

            const balance = await web3.eth.getBalance(accounts[0])
            setAccount(accounts[0]);
            setBalance(balance);
        }
        window.ethereum.on('chainChanged', (chainId) => {
            // Handle the new chain.
            // Correctly handling chain changes can be complicated.
            // We recommend reloading the page unless you have good reason not to.
            window.location.reload();
        });
        fetchUser()
    }, [])
    console.log(balance)
    return <div className="navbar">
        <div className="logo">
            <a href="/">GiftoMatic</a>
            <p className="description">Running on <a style={{ fontSize: 18, color: "crimson" }} href="https://blog.polysynth.com/how-to-connect-polygon-testnet-to-metamask-wallet-472bca410d64">Polygon Mumbai Testnet</a></p>
        </div>
        <div className="userDetails">
            <h5>{account}</h5>
            <button className="button" onClick={() => {
            }}>
                {parseFloat(web3.utils.fromWei(balance, "ether")).toFixed(4).toString()} MATIC
            </button>
        </div>
    </div>;
}

export default Header;
