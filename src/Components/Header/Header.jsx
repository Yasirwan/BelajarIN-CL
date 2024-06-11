import React from "react";
import "./Header.css";
import { RiHomeSmileFill  } from "react-icons/ri";

const Header = ({ Title, Address }) => {
  return (
    <div className="head-title">
      <div className="head-left">{Title}</div>
      <div className="head-right">
        <RiHomeSmileFill /> <p></p> <span>/ {Address}</span>
      </div>
    </div>
  );
};

export default Header;
