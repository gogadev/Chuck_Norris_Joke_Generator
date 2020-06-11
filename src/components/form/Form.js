import React from "react";

import img from "../../assets/fist.png";

import "./form.style.css";

const Search = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  changeName,
}) => {
  return (
    <form className="form" onSubmit={changeName} noValidate>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <img className="search-img" src={img} alt="" />
      <button className="btn" type="submit">
        Change Name
      </button>
    </form>
  );
};

export default Search;
