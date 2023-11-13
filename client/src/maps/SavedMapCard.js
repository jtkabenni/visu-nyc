import React from "react";

function SavedMapCard({ m }) {
  return (
    <div className="map-card">
      <img src={`${process.env.REACT_APP_DOMAIN}/${m.file}`}></img>
      <p>
        <b>
          {m.name} {m.user_username ? `by ${m.user_username}` : ""}
        </b>
      </p>

      <p>{m.note}</p>
    </div>
  );
}

export default SavedMapCard;
