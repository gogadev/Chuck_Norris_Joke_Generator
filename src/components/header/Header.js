import React from "react";

import signature from "../../assets/signature.png";
import image from "../../assets/img.png";

import "./header.style.css";

const Header = () => {
  return (
    <header>
      <h1 className="title">
        <span>
          <img src={signature} alt="" />
        </span>
      </h1>
      <h3 className="subtitle">Joke Generator</h3>
      <div className="image">
        <img className="img" src={image} alt="" />
      </div>
    </header>
  );
};

export default Header;
