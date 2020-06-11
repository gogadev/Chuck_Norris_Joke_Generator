import React from "react";

import { AppBar, Tab, Tabs } from "@material-ui/core";

import upImg from "../../assets/up.png"
import downImg from "../../assets/down.png"

import "./joke-card.style.css"

const JokeCard = ({ likeJoke, unlikeJoke, joke, index }) => {
  return (
    <div id={`joke-${index}`} className="item">
      {joke.categories.length > 0 ? (
        joke.categories.map((cat) => (
          <h5 className="category" key={cat}>
            {cat}
          </h5>
        ))
      ) : (
        <h5 className="category">regular</h5>
      )}
      {joke.joke}
      <button className="button" onClick={() => likeJoke(joke.id)}>
        <img src={upImg} alt=""/>
      </button>
      <button className="button" onClick={() => unlikeJoke(joke.id)}>
      <img src={downImg} alt=""/>
      </button>
    </div>
  );
};

export default JokeCard;
