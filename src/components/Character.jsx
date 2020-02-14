import React from "react";

import "./styles.css"

const character = props => {
  const {
    id,
    name,
    status,
    species,
    gender,
    origin,
    location,
    image
  } = props.characterInfo;
  
  return (
    <div className="card">
      <div className="image">
        <img src={image} />
        <div className="imagetext">
          <h1>{name}</h1>
          <span>id: {id}</span>
        </div>
      </div>
      <div className="info_character">
        <div className="info">
          <span>STATUS</span>
          <p>{status}</p>
        </div>
        <div className="info">
          <span>SPECIES</span>
          <p>{species}</p>
        </div>
        <div className="info">
          <span>GENDER</span>
          <p>{gender}</p>
        </div>
        <div className="info">
          <span>ORIGIN</span>
          <p>{origin.name}</p>
        </div>
        <div className="info">
          <span>LAST LOCATION</span>
          <p>{location.name}</p>
        </div>
      </div>
    </div>
  );
};

export default character;
