import React, { useState } from "react";
import "./dashboard.css";
import { Network, Node, Edge } from "react-vis-network";

//___________________________________________
import { AiOutlineHome } from "react-icons/ai";
import { BiNetworkChart } from "react-icons/bi";
import { GrInstagram } from "react-icons/gr";
import { FaBitcoin } from "react-icons/fa";
import { GiPathDistance } from "react-icons/gi";
import { Link } from "react-router-dom";
//___________________________________________

const Dashboard = (props) => {
  const [toolBar, setToolBar] = useState("graph");

  var options = {
    physics: {
      stabilization: false,
    },
    autoResize: false,
    edges: {
      smooth: false,
      color: "#000000",
      width: 0.5,
      arrows: {
        to: {
          enabled: true,
          scaleFactor: 0.5,
        },
      },
    },
  };

  if (props.isAdmin) {
    return (
      <div className="container-fluid p-0">
        <nav className="navbar navbar-light bg-light p-0 ">
          <div className="iconss-bar col-12 row  gx-0">
            <Link to="/">
              <div className="row col-12 gx-0 ">
                <AiOutlineHome className=" my-auto col-2 icon my-2  " />
                <p className=" my-auto col align-bottom ps-3 ">Home</p>
              </div>
            </Link>
            <div className="row col-1 gx-0 ">
              <BiNetworkChart className="col-2 icon my-2  my-auto" />
              <p className=" my-auto col align-bottom ps-3 ">Graph</p>
            </div>

            <div className="row col-1 gx-0 ">
              <GrInstagram className="col-2 icon my-2 my-auto" />
              <p className=" my-auto col align-bottom ps-3 ">Social</p>
            </div>
            <div className="row col-1 gx-0 ">
              <GiPathDistance className="col-2 icon my-2 my-auto" />
              <p className=" my-auto col align-bottom ps-3 ">Algorithm</p>
            </div>

            <div className="row col-3 gx-0 text-nowrap my-auto">
              <FaBitcoin className=" col-1 icon my-2 " />
              <p className=" my-auto col align-bottom  text-nowrap ps-3 ">
                Blockchain
              </p>
            </div>
          </div>
          <div className="row g-0 toolbar">
            {(() => {
              switch (toolBar) {
                case "graph":
                  return (
                    <div>
                      <p>Hello dd</p>
                    </div>
                  );
                  break;
                case "social_media":
                  return (
                    <div>
                      <p>Hello</p>
                    </div>
                  );
                  break;
                case "blockchain":
                  return (
                    <div>
                      <p>Hello</p>
                    </div>
                  );
                  break;
                default:
                  return null;
                  break;
              }
            }).call(this)}
          </div>
        </nav>
        <div className="graph-canvas">
          <Network
            options={{
              physics: {
                stabilization: false,
              },
              autoResize: false,
              edges: {
                smooth: false,
                color: "#000000",
                width: 0.5,
                arrows: {
                  to: {
                    enabled: true,
                    scaleFactor: 0.5,
                  },
                },
              },
            }}
          >
            <Node id="me" label="me" />
            <Node id="friend_1" label="friend_1" />
            <Node id="friend_2" label="friend_2" />
            <Edge id="1" from="friend_1" to="me" />
            <Edge id="2" from="friend_2" to="me" />
          </Network>
        </div>
      </div>
    );
  } else {
    return <h1>please sign in</h1>;
  }
};

export default Dashboard;
