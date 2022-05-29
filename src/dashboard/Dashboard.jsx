import React, { useState } from "react";
import "./dashboard.css";
import { AiOutlineHome } from "react-icons/ai";

import { BiNetworkChart } from "react-icons/bi";
import { GrInstagram } from "react-icons/gr";
import { FaBitcoin } from "react-icons/fa";

const Dashboard = (props) => {
  const [toolBar, setToolBar] = useState("graph");

  //if (true) {
  if (props.isAdmin) {
    return (
      <div className="container-fluid p-0">
        <nav className="navbar navbar-light bg-light p-0 ">
          <div className="row gx-0">
            <AiOutlineHome className=" col-1 icon my-2 " />
            <BiNetworkChart className=" col-1 icon my-2 " />
            <GrInstagram className=" col-1 icon my-2 " />
            <FaBitcoin className=" col-1 icon my-2 " />
          </div>
          <div className="row gx-0">
            {(() => {
              switch (toolBar) {
                case "graph":
                  return (
                    <>
                      <p>Hello dd</p>
                    </>
                  );
                  break;
                case "social_media":
                  return (
                    <>
                      <p>Hello</p>
                    </>
                  );
                  break;
                case "blockchain":
                  return (
                    <>
                      <p>Hello</p>
                    </>
                  );
                  break;
                default:
                  return null;
                  break;
              }
            }).call(this)}
          </div>
        </nav>
      </div>
    );
  } else {
    return <h1>please sign in</h1>;
  }
};

export default Dashboard;
