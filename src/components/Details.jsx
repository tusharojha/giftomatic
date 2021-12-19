import React from "react";

const Details = () => {
    return <div className="container left">
        <h5 className="donationTitle">Team OpenSeas
            <div className="status running">Running</div>
            {/* <div className="status completed">Completed</div> */}
        </h5>
        <p className="donationDescription">
            Help Mr.Beast and team to make the water bodies cleaner!
        </p>
        <a className="link" href="#">Associated Link</a>
        <img height={400} width={400} src="" />
    </div>;
}

export default Details;