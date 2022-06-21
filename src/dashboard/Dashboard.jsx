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
  function highlightNode(getNodesId, groupProp, deHighlight) {
    console.log(getNodesId);
    setGraphState(({ graph: { nodes, edges }, counter, ...rest }) => {
      const id = counter + 1;
      counter++;
      const from = Math.floor(Math.random() * 10);

      function calculateDefaultGroup(nodeId) {
        const targetId = nodeId - 1;
        let groupPrevious;
        graphState.graph.nodes.map((node) => {
          if (node.id == targetId - 1) {
            groupPrevious = node.group;
          }
        });
        if (groupPrevious == 0 || groupPrevious == -1) {
          groupPrevious = 1;
        }
      }

      const targetIds = getNodesId.map((id) => {
        return parseInt(id);
      });
      console.log(targetIds);
      if (8 in targetIds) {
        alert("wqda");
      }
      const newNodes = graphState.graph.nodes.map((node) => {
        if (targetIds.includes(node.id)) {
          console.log(node.id);
          return { ...node, group: groupProp };
        }
        // else if (
        //   node.group == groupProp &&
        //   node.id != node.id &&
        //   deHighlight
        // ) {
        //   return {
        //     ...node,
        //     group: calculateDefaultGroup(node.id),
        //     shape: "dot",
        //   };
        // }
        return node;
      });

      return {
        graph: {
          nodes: [
            ...newNodes,
            // ...nodes,
            // { id: targetNodeId, label: nodeName, group: "highlited" },
          ],
          edges: [...edges],
        },
        counter: counter,
        ...rest,
      };
    });
  }
  function unHighlight(targetNodeId) {
    setGraphState(({ graph: { nodes, edges }, counter, ...rest }) => {
      const id = counter + 1;
      const from = Math.floor(Math.random() * 10);
      let groupPrevious;
      const targetId = targetNodeId - 1;
      graphState.graph.nodes.map((node) => {
        if (node.id == targetId) {
          groupPrevious = node.group;
        }
      });

      const newNodes = graphState.graph.nodes.map((node) => {
        if (node.id == targetNodeId) {
          return { ...node, group: groupPrevious, shape: "dot" };
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
  function BFS(nodesList, edgeList, startNode, targetNode) {
    const adjacenceyList = new Map();
    function addNode(node) {
      adjacenceyList.set(node, []);
    }

    function addEdge(origin, destination) {
      adjacenceyList.get(origin).push(destination);
      adjacenceyList.get(destination).push(origin);
    }

    nodesList.forEach((node) => {
      addNode(node.id);
    });

    edgeList.forEach((edge) => {
      addEdge(edge.from, edge.to);
    });

    console.log(adjacenceyList);
    const visitedNodes = new Set();

    const queue = [startNode];

    while (queue.length > 0) {
      const currentNode = queue.shift();
      console.log("currentNode: " + currentNode);

      const connectedNodes = adjacenceyList.get(currentNode);

      console.log("connectedNodes: " + connectedNodes);

      if (currentNode == targetNode) {
        console.log("Found it!");
        console.log(visitedNodes);
        highlightNode([...visitedNodes], "selected", false);
        // visitedNodes.forEach((node) => {});
        return true;
      }

      for (const connectedNode of connectedNodes) {
        if (!visitedNodes.has(connectedNode)) {
          visitedNodes.add(connectedNode);
          queue.push(connectedNode);
        }
      }
    }
  }

  var targetNode;
  var startingNode;
  const [startingNodeState, setStartingNodeState] = useState();
  const [targetNodeState, setTargetNodeState] = useState();

  function handleStartButton() {
    if (algorithm == "Breath first search") {
      BFS(
        graphState.graph.nodes,
        graphState.graph.edges,
        parseInt(startingNodeState),
        parseInt(targetNodeState)
      );
    } else if (algorithm == "Depth first search") {
    }
  }
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

  //const [algorithm, setAlgorithm] = useState("Choose algorithm");
  const [algorithm, setAlgorithm] = useState("Breath first search");

  useEffect(() => {});

  //if (props.isAdmin) {
  if (true) {
    return (
      <div className="container-fluid p-0">
        <nav className="navbar navbar-light bg-light p-0 ">
          <div className="iconss-bar col-12 row  gx-0">
            {/* Home button */}
            <Link to="/">
              {" "}
              <div
                style={{ cursor: "pointer" }}
                className="row col-12 gx-0 "
                id="adsasdsa"
              >
                <AiOutlineHome className=" my-auto col-2 icon my-2  " />
                <p className=" my-auto col align-bottom  ">Home</p>
              </div>
            </Link>

            {/* Graph settings */}
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

            {/* Social */}
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                setToolBar("social_media");
                console.log("!!");
              }}
              className="row col-2 col-lg-1 gx-0 "
            >
              <GrInstagram className="col-2 icon my-2 my-auto" />
              <p className=" my-auto col align-bottom  ">Social</p>
            </div>

            {/* Algorithm */}
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

            {/* Blockchain button */}
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
                        onClick={() => {}}
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
                              startingNode = e.target.value;
                              setStartingNodeState(startingNode);

                              highlightNode([startingNode], "start");
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
                                  {node.label}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div className="col-2 d-flex justify-content-center h-50 my-auto">
                          <select
                            aria-label="Small select"
                            className="form-select form-select-sm"
                            value={targetNode}
                            onChange={(e) => {
                              targetNode = e.target.value;
                              setTargetNodeState(targetNode);
                              highlightNode([targetNode], "target");
                              // let pastStartingNode = targetNode
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
                                  {node.label}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div className="col-1 d-flex justify-content-center">
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
                    centralGravity: 0,
                    springLength: 500,
                    nodeDistance: 350,
                    damping: 0.3,
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
                    color: { background: "green" },
                    shape: "triangleDown",
                  },
                  target: {
                    color: { background: "red" },
                    shape: "star",
                  },
                },
                configure: {
                  enabled: true,
                  filter: "physics",
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
