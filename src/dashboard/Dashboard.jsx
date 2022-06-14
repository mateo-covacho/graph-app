import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Graph from "react-graph-vis";
import { graphNodes, graphEdges } from "./GraphData.jsx";
// import "./network.css";
// import "./styles.css";
//___________________________________________
import { AiOutlineHome } from "react-icons/ai";
import { BiNetworkChart } from "react-icons/bi";
import { GrInstagram } from "react-icons/gr";
import { FaBitcoin } from "react-icons/fa";
import { GiPathDistance } from "react-icons/gi";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { Link } from "react-router-dom";
//___________________________________________
//you fucking idiot forgot to add array when itiraring throught sf ¡ODFGS¡Hg+<d
const Dashboard = (props) => {
  const [toolBar, setToolBar] = useState("algorithm");
  function randomColor() {
    const red = Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0");
    const green = Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0");
    const blue = Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0");
    return `#${red}${green}${blue}`;
  }
  var nodeGroup;
  function highlitNode(targetNodeId, groupProp) {
    setGraphState(({ graph: { nodes, edges }, counter, ...rest }) => {
      counter++;
      const id = counter + 1;
      const from = Math.floor(Math.random() * 10);
      const newNodes = graphState.graph.nodes.map((node) => {
        if (node.id == targetNodeId) {
          var nodeGroup = node.group;
          return { ...node, group: groupProp };
        }
        return node;
      });

      return {
        graph: {
          nodes: [
            ...newNodes,
            // ...nodes,
            // { id: targetNodeId, label: nodeName, group: "highlited" },
          ],
          edges: [
            ...edges,
            {
              from,
              to: id,
            },
          ],
        },
        counter: counter,
        ...rest,
      };
    });
  }
  function unHighlit(targetNodeId) {
    setGraphState(({ graph: { nodes, edges }, counter, ...rest }) => {
      const id = counter + 1;
      const from = Math.floor(Math.random() * 10);

      const newNodes = graphState.graph.nodes.map((node) => {
        if (node.id == targetNodeId) {
          return { ...node, group: 1 };
        }
        return node;
      });
      //   const previousNodeGroup = graphState.graph.nodes[targetNodeId - 1].group;
      return {
        graph: {
          nodes: [
            ...newNodes,
            // ...nodes,
            // { id: targetNodeId, label: nodeName, group: "highlited" },
          ],
          edges: [
            ...edges,
            {
              from,
              to: id,
            },
          ],
        },
        counter: counter,
        ...rest,
      };
    });
  }

  function handleStartButton() {}
  const createNode = (x, y) => {
    const color = randomColor();
    setGraphState(({ graph: { nodes, edges }, counter, ...rest }) => {
      const id = counter + 1;
      const from = Math.floor(Math.random() * 100);
      return {
        graph: {
          nodes: [...nodes, { id, label: `Node ${id}`, color, x, y }],
          edges: [
            ...edges,
            {
              from,
              to: id,
            },
          ],
        },
        counter: id,
        ...rest,
      };
    });
  };
  const [graphState, setGraphState] = useState({
    counter: 76,

    graph: {
      nodes: graphNodes,
      edges: graphEdges,
    },
  });
  const [eventsState, setEventsState] = useState({
    events: {
      select: ({ nodes, edges }) => {
        // console.log("Selected edges:");
        // console.log(edges);
      },
      doubleClick: ({ pointer: { canvas } }) => {
        createNode(canvas.x, canvas.y);
      },
    },
  });
  // const [startingNode, setStartingNode] = useState(0);
  // const [targetNode, setTargetNode] = useState(0);
  var startingNode = startingNode;
  var targetNode = targetNode;
  const [algorithm, setAlgorithm] = useState("Choose algorithm");

  useEffect(() => {});

  if (props.isAdmin) {
    //if (true) {
    return (
      <div className="container-fluid p-0">
        <nav className="navbar navbar-light bg-light p-0 ">
          <div className="iconss-bar col-12 row  gx-0">
            <Link to="/">
              <div
                style={{ cursor: "pointer" }}
                className="row col-12 gx-0 "
                id="adsasdsa"
              >
                <AiOutlineHome className=" my-auto col-2 icon my-2  " />
                <p className=" my-auto col align-bottom  ">Home</p>
              </div>
            </Link>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                setToolBar("graph");
              }}
              className="row col-2 col-lg-1 gx-0 "
            >
              <BiNetworkChart className="col-2 icon my-2  my-auto" />
              <p className=" my-auto col align-bottom  ">Graph</p>
            </div>

            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                setToolBar("social_media");
              }}
              className="row col-2 col-lg-1 gx-0 "
            >
              <GrInstagram className="col-2 icon my-2 my-auto" />
              <p className=" my-auto col align-bottom  ">Social</p>
            </div>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                setToolBar("algorithm");
                console.clear();
              }}
              className="row col-2 col-lg-1 gx-0 "
            >
              <GiPathDistance className="col-2 icon my-2 my-auto" />
              <p className=" my-auto col align-bottom  ">Algorithm</p>
            </div>

            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                setToolBar("blockchain");
              }}
              className="row col-3 gx-0 text-nowrap my-auto"
            >
              <FaBitcoin className=" col-2 col-lg-1 icon my-2 " />
              <p className=" my-auto col align-bottom  text-nowrap  ">
                Blockchain
              </p>
            </div>
          </div>
          <div className="row g-0 " id="toolbar">
            {(() => {
              switch (toolBar) {
                case "graph":
                  return (
                    <div className="container-fluid">
                      <h2
                        className="blacktext display-1 fs-4"
                        onClick={() => {
                          var redraw = 1;
                        }}
                      >
                        Graph options
                      </h2>
                    </div>
                  );
                case "social_media":
                  return (
                    <div>
                      <h2 className="blacktext display-1 fs-4">Social_media</h2>
                    </div>
                  );
                case "algorithm":
                  return (
                    <div className="container-fluid">
                      <div className="row buttons_row">
                        <div className=" dropdown ms-4 my-auto ps-0 col-3 ">
                          <button
                            className="btn btn-primary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            {algorithm}
                          </button>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <li
                              onClick={() => {
                                setAlgorithm("Breath first search");
                              }}
                            >
                              <div className="dropdown-item">
                                Breath first search
                              </div>
                            </li>
                            <li
                              onClick={() => {
                                setAlgorithm("Depth first search");
                              }}
                            >
                              <div className="dropdown-item">
                                Depth first search
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="col-2 d-flex justify-content-center h-50 my-auto">
                          <select
                            className="form-select form-select-sm"
                            aria-label="Small select"
                            value={startingNode}
                            onChange={(e) => {
                              console.log(
                                "unSelect starting node" + startingNode
                              );
                              unHighlit(startingNode);
                              startingNode = e.target.value;
                              highlitNode(startingNode, "start");
                            }}
                          >
                            <option className="blacktext" value="">
                              Start node
                            </option>
                            {graphState.graph.nodes.map((node) => {
                              return (
                                <option
                                  key={node.id}
                                  className="blacktext"
                                  value={node.id}
                                >
                                  {node.id}: {node.label}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div className="col-1 arrow-container m-auto">
                          <MdOutlineDoubleArrow size={"40%"} />
                        </div>
                        <div className="col-2 d-flex justify-content-center h-50 my-auto">
                          <select
                            aria-label="Small select"
                            className="form-select form-select-sm"
                            value={targetNode}
                            onChange={(e) => {
                              console.log("unHighlit " + targetNode);
                              unHighlit(targetNode);
                              targetNode = e.target.value;
                              highlitNode(targetNode, "target");
                            }}
                          >
                            <option className="blacktext" value="">
                              Target node
                            </option>
                            {graphState.graph.nodes.map((node) => {
                              return (
                                <option
                                  key={node.id}
                                  className="blacktext"
                                  value={node.id}
                                >
                                  {node.id}: {node.label}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div className="col-3 d-flex justify-content-center">
                          <button
                            type="button"
                            className="btn btn-primary m-auto "
                            onClick={() => {
                              handleStartButton();
                            }}
                          >
                            Start
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                case "blockchain":
                  return (
                    <div>
                      <h2 className="blacktext display-1 fs-4">Blockchain</h2>
                    </div>
                  );
                default:
                  return null;
              }
            }).call(this)}
          </div>
        </nav>
        <div className="graph-canvas">
          {" "}
          <Graph
            graph={graphState.graph}
            //options={options}
            events={eventsState.events}
            getNetwork={(network) => {
              //  if you want access to vis.js network api you can set the graphState in a parent component using this property
              network.setOptions({
                nodes: {
                  shape: "dot",
                  size: 15,
                },
                edges: {
                  smooth: {
                    forceDirection: "vertical",
                    roundness: 1,
                  },
                  arrows: {
                    to: false,
                  },
                  width: 1,
                },
                physics: {
                  repulsion: {
                    springLength: 285,
                  },
                  minVelocity: 0.75,
                  solver: "repulsion",
                },
                groups: {
                  start: {
                    color: { background: "red" },
                    shape: "diamond",
                  },
                  selected: {
                    color: { background: "red" },
                    shape: "diamond",
                  },
                  target: {
                    color: { background: "red" },
                    shape: "triangle",
                  },
                },
                configure: {
                  enabled: true,
                  filter: "nodes",
                  container: document.getElementById("graphoptions"),
                  showButton: true,
                },
              });
            }}
          />
        </div>
        <div id="graphoptions"></div>
      </div>
    );
  } else {
    return <h1>please sign in</h1>;
  }
};

export default Dashboard;
