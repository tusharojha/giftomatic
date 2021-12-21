import React from "react";

import { useMoralis } from "react-moralis";

const Header = () => {
    const { user, logout } = useMoralis();
    return <div className="navbar">
        <div className="logo">
            <a href="/">GiftoMatic</a>
            <p className="description">Running on Polygon Mumbai Testnet</p>
        </div>
        <div className="userDetails">
            <h5>{user.get('ethAddress')}</h5>
            <button className="button" onClick={async () => {
                logout()
            }}>
                Logout
            </button>
        </div>
    </div>;
}

export default Header;
