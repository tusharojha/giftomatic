import "./item.css";

export const Item = ({ item, showDetails, isMe }) => {
  const completed = (parseInt(item['targetAmount']) <= parseInt(item['collectedAmount']));
  return (
    <div className="itemTile">
      <h5 className="donationTitle"> {item['title']}
        {completed ? <div className="status completed">Completed</div> : <div className="status running">Running</div>}
      </h5>
      <p className="donationDescription">
        {item['description'].length > 100 ? item['description'].substring(0, 100) + ' ...' : item['description']}
      </p>
      <button onClick={() => showDetails()} className="button">{isMe ? 'View Details' : 'Donate'}</button>
    </div>
  );
};
