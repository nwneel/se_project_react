import { useState } from "react";
import { NavLink } from "react-router-dom";

import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

import logo from "../../assets/Day/logo.svg";
import avatar from "../../assets/avatar.png";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__row">
        {/* TODO: link to homepage */}
        <img className="header__logo" alt="WTWR logo" src={logo} />
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      {/* onClick={handleAddClick} opens when you click add clothes*/}
      <div className="header__row">
        <ToggleSwitch />
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add clothes
        </button>
        {/* NavLink to="/profile" takes us profile page when we click on the name in the main page */}
        <NavLink className="header__nav-link" to="/profile">
          <div className="header__user-container">
            <p className="header__username">Terrence Tegegne</p>
            <img
              src={avatar}
              alt="Terrence Tegegne"
              className="header__avatar"
            />
          </div>
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
