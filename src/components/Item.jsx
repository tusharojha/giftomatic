import "./item.css";

export const Item = ({ item, showDetails }) => {
  const completed = (parseInt(item['targetAmount']) <= parseInt(item['collectedAmount']));
  return (
    <div className="itemTile">
      <h5 className="donationTitle"> {item['title']}
        {completed ? <div className="status completed">Completed</div> : <div className="status running">Running</div>}
      </h5>
      <p className="donationDescription">
        {item['description']}
      </p>
      <button onClick={() => showDetails()} className="button">View Details</button>
    </div>
  );
};
