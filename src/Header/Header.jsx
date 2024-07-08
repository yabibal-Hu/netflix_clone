import React from "react";
import { useEffect, useState } from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Avatar } from "@mui/material";

function Nav() {
  const [show, handleShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);
  let netflixLogo =
    "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg";






  return (
    <div className={`header ${show && "header__black"}`}>
      <div className="header__left">
        <ul>
          <li>
            <img className="header__logo" src={netflixLogo} alt="" />
          </li>
          <li>Home</li>
          <li>TvShows</li>
          <li>Movies</li>
          <li>Latest</li>
          <li>MyList</li>
          <li>Browser by languges</li>
        </ul>
      </div>
      <div className="header__right">
        <ul>
          <li>
            <SearchIcon />
          </li>
          <li>
            <NotificationsNoneIcon />
          </li>
          <li>
            <Avatar />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Nav;
















{/* <img
  className="nav__avatar"
  src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png"
  alt="Avatar"
/> */}