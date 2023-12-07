import React from "react";
import SavedMapCard from "./SavedMapCard";

function SavedMapList({ maps }) {
  return (
    <div className="map-list">
      <h3>All maps</h3>
      {maps.length ? (
        <>
          {maps.map((m) => (
            <SavedMapCard key={m.id} m={m}></SavedMapCard>
          ))}
        </>
      ) : (
        <i>No maps added yet.</i>
      )}
    </div>
  );
}

export default SavedMapList;
