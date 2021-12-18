import "./item.css";

export const Item = ({ showDetails }) => {
  return (
    <div className="itemTile">
      <h5 className="donationTitle">Team OpenSeas
        <div className="status running">Running</div>
        {/* <div className="status completed">Completed</div> */}
      </h5>
      <p className="donationDescription">
        Help Mr.Beast and team to make the water bodies cleaner!
      </p>
      <button onClick={() => showDetails()} className="button">View Details</button>
    </div>
  );
};
