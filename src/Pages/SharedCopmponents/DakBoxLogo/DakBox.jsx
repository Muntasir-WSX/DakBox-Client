import React from "react";
import logo from "../../../assets/logo.png";
import { Link } from "react-router";
const DakBox = () => {
  return (
    <Link to="/">
      <div className="flex items-end">
        <img className="mb-1" src={logo} alt="" />
        <p className="text-3xl -ml-2 font-extrabold">DakBox</p>
      </div>
    </Link>
  );
};

export default DakBox;
