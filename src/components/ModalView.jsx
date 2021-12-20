import React from "react";
import Modal from 'react-modal';

import "./campaign.css";
import CreateCampaign from "./CreateCampaign";
import Details from "./Details";

const customStyles = {
    content: {
        width: "50%",
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '20px',
        padding: '20px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)'
    },
};

const ModalView = ({ selectedId, selectedCampaign, isDetails, modalIsOpen, closeModal }) => {

    return <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Create Campaign Form"
        style={customStyles}
    >
        <div className="crossButton">
            <button style={{ border: 0, backgroundColor: '#fff', fontSize: 18 }} onClick={closeModal}>X</button>
        </div>
        <h2 className="heading"> {isDetails ? "View Details" : "Create Campaign"}</h2>
        {isDetails ? <Details selectedId={selectedId} campaign={selectedCampaign} closeModal={closeModal} /> : <CreateCampaign closeModal={closeModal} />}
    </Modal>;
}

export default ModalView;