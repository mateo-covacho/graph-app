import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Graph from "react-graph-vis";
import { graphNodes, graphEdges, graphNodesBasic } from "./data/GraphData.jsx";
// import "./network.css";
// import "./styles.css";
//___________________________________________
import { AiOutlineHome, AiFillQuestionCircle } from "react-icons/ai";
import { BiNetworkChart } from "react-icons/bi";
import { GrInstagram } from "react-icons/gr";
import { FaBitcoin } from "react-icons/fa";
import { GiPathDistance } from "react-icons/gi";
import { IoStarSharp, IoReloadCircleSharp, IoTriangle } from "react-icons/io5";
import { BsFillDiamondFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
//___________________________________________

const Dashboard = (props) => {
  const [toolBar, setToolBar] = useState("blockchain");
  var targetNode;
  var startingNode;
  const [startingNodeState, setStartingNodeState] = useState();
  const [targetNodeState, setTargetNodeState] = useState();
  const [algorithm, setAlgorithm] = useState("Choose algorithm");
  const [graphState, setGraphState] = useState({
    counter: 76,

    graph: {
      nodes: graphNodesBasic,
      edges: graphEdges,
    },
  });

  const [eventsState, setEventsState] = useState({
    events: {
      select: ({ nodes, edges }) => {},
      doubleClick: ({ pointer: { canvas } }) => {
        createNode(canvas.x, canvas.y);
      },
    },
  });
  const [address, setAddress] = useState();

  // MODAL
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
  function highlightNode(getNodesId, groupProp, delay) {
    setGraphState(({ graph: { nodes, edges }, counter, ...rest }) => {
      const id = counter + 1;
      counter++;
      const from = Math.floor(Math.random() * 10);

      function calculateDefaultGroup(nodeId) {
        let groupPrevious;
        graphState.graph.nodes.map((node) => {
          if (node.id == parseInt(nodeId) - 1) {
            groupPrevious = node.group;
          }
        });
        if (groupPrevious == 0 || groupPrevious == -1) {
          groupPrevious = 1;
        }

        return groupPrevious;
      }

      const targetIds = getNodesId.map((id) => {
        return parseInt(id);
      });

      const newNodes = graphState.graph.nodes.map((node) => {
        if (targetIds.includes(node.id)) {
          return { ...node, group: groupProp };
        } else if (node.group == groupProp && !targetIds.includes(node.id)) {
          return {
            ...node,
            group: calculateDefaultGroup(node.id),
            shape: "dot",
          };
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
          edges: [...edges],
        },
        counter: counter,
        ...rest,
      };
    });
  }

  function highlightEdge(node1, node2) {
    console.log("node1: " + node1);
    console.log("node2: " + node2);
    setGraphState(({ graph: { nodes, edges }, counter, ...rest }) => {
      const newEdges = edges.map((edge) => {
        if ((edge.from == node1 && edge.to == node2) || (edge.from == node1 && edge.to == node2)) {
          console.log("found edges to highlight between" + node1 + "and" + node2);
          return {
            ...edge,
            background: {
              enabled: true,
              color: "red",
              size: 10,
            },
          };
        } else {
          return edge;
        }
      });

      return {
        graph: {
          nodes: nodes,
          edges: newEdges,
        },
        counter: counter,
        ...rest,
      };
    });
  }

  function higliteMultipleEdges(edgesArray) {
    setGraphState(({ graph: { nodes, edges }, counter, ...rest }) => {
      const newEdges = edges.map((edge) => {
        if (!edgesArray.includes(edge.to) || !edgesArray.includes(edge.from)) {
          return edge;
        } else if (edgesArray.indexOf(edge.from) == parseInt(edgesArray.indexOf(edge.to) - 1)) {
          return {
            ...edge,
            background: {
              enabled: true,
              color: "red",
              size: 10,
            },
            arrows: {
              to: { enabled: true, scaleFactor: 1.5 },
            },
          };
        } else if (edgesArray.indexOf(edge.to) == parseInt(edgesArray.indexOf(edge.from) - 1)) {
          return {
            ...edge,
            background: {
              enabled: true,
              color: "red",
              size: 10,
            },
            arrows: {
              from: { enabled: true, scaleFactor: 1.5 },
            },
          };
        } else return edge;
      });

      return {
        graph: {
          nodes: nodes,
          edges: newEdges,
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
    let prev = Array(graphState.graph.nodes.length);
    console.log("prev: " + prev);
    visitedNodes.add(startNode);
    while (queue.length > 0) {
      const currentNode = queue.shift();
      console.log("currentNode: " + currentNode);

      const connectedNodes = adjacenceyList.get(currentNode);

      if (currentNode == targetNode) {
        console.log("Found it!");
        visitedNodes.delete(startNode);
        visitedNodes.delete(targetNode);
        console.log("visited: ", visitedNodes);
        highlightNode([...visitedNodes], "selected", 1000);

        let path = [];
        console.log(prev);

        let i;
        for (i = targetNode; i != startNode; i = prev[i]) {
          path.push(prev[i]);
        }

        path.reverse();
        path = [...path, targetNode];
        console.log("path: " + path);

        higliteMultipleEdges(path);

        return true;
      }

      for (const connectedNode of connectedNodes) {
        if (!visitedNodes.has(connectedNode)) {
          visitedNodes.add(connectedNode);
          queue.push(connectedNode);
          prev[connectedNode] = currentNode;
        }
      }
    }
  }

  function DFS(nodesList, edgeList, startNode, targetNode) {
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

    const visitedNodes = new Set();

    let path = [];
    let finished = false;
    function DepthFirstSearch(start, visited = new Set(), previousNode) {
      console.log("Current node:" + start);

      visited.add(start);
      let conections = adjacenceyList.get(start);

      var result = false;

      for (const conection of conections) {
        if (conection == targetNode && !finished) {
          console.log("found it !!!!! ");
          finished = true;
          visited.delete(startNode);
          visited.delete(targetNode);
          highlightNode([...visited], "selected", 1000);
          path = [startNode, ...path, targetNode];
          console.log("Path taken: " + path);
          higliteMultipleEdges(path);
          return true;
        }
        if (!visited.has(conection) && !finished) {
          path.push(conection);
          result = DepthFirstSearch(conection, visited, conection);
          const conectionsOfConection = adjacenceyList.get(parseInt(conection));
          if (!result || conectionsOfConection == 0) {
            path.splice(path.indexOf(conection), 1);
          }
        }
      }
      return result;
    }

    DepthFirstSearch(startNode, visitedNodes);
  }

  function resetGraph() {
    setGraphState({
      counter: graphState.counter,
      graph: {
        nodes: graphNodes,
        edges: graphEdges,
      },
    });
  }

  function handleStartButton() {
    if (algorithm == "Breath first search") {
      BFS(graphState.graph.nodes, graphState.graph.edges, parseInt(startingNodeState), parseInt(targetNodeState));
    } else if (algorithm == "Depth first search") {
      DFS(graphState.graph.nodes, graphState.graph.edges, parseInt(startingNodeState), parseInt(targetNodeState));
    }
    console.log(graphState.graph);
  }

  function createNode(x, y) {
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
  }

  function importWalletNetwork(walletAddress) {
    fetch("https://6ryss6wbm3.execute-api.us-east-1.amazonaws.com/dev/?wallet=" + walletAddress, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setGraphState({
          graph: { nodes: data.nodes, edges: data.edges },
          counter: graphState.counter,
        });
      });
  }

  function setGraphData(graph_name) {
    if (graph_name == "Les miserables") {
      setGraphState({
        graph: {
          nodes: graphNodes,
          edges: graphEdges,
        },
      });
    }
  }

  return (
    <div className='container-fluid p-0'>
      <nav className='navbar navbar-light bg-light p-0 '>
        <div className='iconss-bar col-12 row  gx-0'>
          {/* Home button */}
          <Link to='/'>
            {" "}
            <div style={{ cursor: "pointer" }} className='row col-12 gx-0 ' id='adsasdsa'>
              <AiOutlineHome className=' my-auto col-2 icon my-2  ' />
              <p className=' my-auto col align-bottom  '>Home</p>
            </div>
          </Link>

          {/* Graph settings */}
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              setToolBar("graph");
              console.log(graphState.graph);
            }}
            className='row col-2 col-lg-1 gx-0 '
          >
            <BiNetworkChart className='col-2 icon my-2  my-auto' />
            <p className=' my-auto col align-bottom  '>Graph</p>
          </div>

          {/* Social */}
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              setToolBar("social_media");
            }}
            className='row col-2 col-lg-1 gx-0 '
          >
            <GrInstagram className='col-2 icon my-2 my-auto' />
            <p className=' my-auto col align-bottom  '>Social</p>
          </div>

          {/* Algorithm */}
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              setToolBar("algorithm");
              console.clear();
            }}
            className='row col-2 col-lg-1 gx-0 '
          >
            <GiPathDistance className='col-2 icon my-2 my-auto' />
            <p className=' my-auto col align-bottom  '>Algorithm</p>
          </div>

          {/* Blockchain button */}
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              setToolBar("blockchain");
            }}
            className='row col-3 gx-0 text-nowrap my-auto'
          >
            <FaBitcoin className=' col-2 col-lg-1 icon my-2 ' />
            <p className=' my-auto col align-bottom  text-nowrap  '>Blockchain</p>
          </div>
        </div>
        <div className='row h-auto g-0 ' id='toolbar'>
          {(() => {
            switch (toolBar) {
              case "graph":
                return (
                  <div className='container-fluid '>
                    <div className='row buttons_row'>
                      <div className=' dropdown ms-4 my-auto ps-0 col-3 '>
                        <button className='btn btn-primary dropdown-toggle' type='button' id='dropdownMenuButton' data-bs-toggle='dropdown' aria-expanded='false'>
                          Select sample graph
                        </button>
                        <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
                          <li
                            onClick={() => {
                              setGraphData("Les miserables");
                            }}
                          >
                            <div className='dropdown-item'>Les Misérables</div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              case "social_media":
                return (
                  <div className='container-fluid '>
                    <div className='row buttons_row'></div>
                  </div>
                );
              case "algorithm":
                return (
                  <div className='container-fluid '>
                    <div className='row buttons_row'>
                      <div className=' dropdown ms-4 my-auto ps-0 col-3 '>
                        <button className='btn btn-primary dropdown-toggle' type='button' id='dropdownMenuButton' data-bs-toggle='dropdown' aria-expanded='false'>
                          {algorithm}
                        </button>
                        <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
                          <li
                            onClick={() => {
                              setAlgorithm("Breath first search");
                            }}
                          >
                            <div className='dropdown-item'>Breath first search</div>
                          </li>
                          <li
                            onClick={() => {
                              setAlgorithm("Depth first search");
                            }}
                          >
                            <div className='dropdown-item'>Depth first search</div>
                          </li>
                        </ul>
                      </div>
                      <div className='col-2 d-flex justify-content-center h-50 my-auto'>
                        <select
                          className='form-select form-select-sm'
                          aria-label='Small select'
                          value={startingNode}
                          onChange={(e) => {
                            startingNode = e.target.value;
                            setStartingNodeState(startingNode);

                            highlightNode([startingNode], "start");
                          }}
                        >
                          <option className='blacktext' value=''>
                            Start node
                          </option>
                          {graphState.graph.nodes.map((node) => {
                            return (
                              <option key={node.id} className='blacktext' value={node.id}>
                                {node.label}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className='col-2 d-flex justify-content-center h-50 my-auto'>
                        <select
                          aria-label='Small select'
                          className='form-select form-select-sm'
                          value={targetNode}
                          onChange={(e) => {
                            targetNode = e.target.value;
                            setTargetNodeState(targetNode);
                            highlightNode([targetNode], "target");
                            // let pastStartingNode = targetNode
                          }}
                        >
                          <option className='blacktext' value=''>
                            Target node
                          </option>
                          {graphState.graph.nodes.map((node) => {
                            return (
                              <option key={node.id} className='blacktext' value={node.id}>
                                {node.label}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className='col-1 d-flex justify-content-center'>
                        <button
                          type='button'
                          className='btn btn-primary m-auto '
                          onClick={() => {
                            handleStartButton();
                          }}
                        >
                          Start
                        </button>
                      </div>
                      <div className='col-1 m-auto mx-0 my-auto h-50 p-auto justify-content-center '>
                        <IoReloadCircleSharp
                          className='col-6 col-lg-3  h-100 my-auto'
                          onClick={() => {
                            resetGraph();
                          }}
                        />
                      </div>
                      <div className='col-1 m-auto mx-0 my-auto h-50 p-auto '>
                        <AiFillQuestionCircle onClick={handleShow} className='col-6 col-lg-3  h-100 my-auto' />

                        <Modal show={show} onHide={handleClose} animation={false} centered>
                          <Modal.Header closeButton>
                            <Modal.Title className='blacktext'>Info</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <div className='row blacktext pb-1  '>
                              <div className=' m-0 p-0 mx-0 w-auto col-1  d-flex align-items-center'>
                                <BsFillDiamondFill size='30px' />
                              </div>
                              <div className='blacktext col-11 align-middle class align-items-center  d-flex'>The diamond node indicates the starting node</div>
                            </div>
                            <div className='row blacktext pb-1 '>
                              <div className=' m-0 p-0 mx-0 w-auto col-1  d-flex align-items-center'>
                                <IoStarSharp size='30px' />
                              </div>
                              <div className='blacktext col-11 align-middle class align-items-center  d-flex'>The star node indicates the target node</div>
                            </div>
                            <div className='row blacktext pb-1 '>
                              <div className=' m-0 p-0 mx-0 w-auto col-1 icon-flipped d-flex align-items-center'>
                                <IoTriangle className='rotate-90' size='30px' />
                              </div>
                              <div className='blacktext col-11 align-middle class align-items-center  d-flex'>The upside-down triangle node indicates the target node</div>
                            </div>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant='primary' onClick={handleClose}>
                              Close
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </div>
                    </div>
                  </div>
                );
              case "blockchain":
                return (
                  <div className='container-fluid '>
                    <div className='row buttons_row '>
                      <div className='col-2 m-auto mx-0 my-auto h-50 p-auto ms-3  '>
                        <button
                          type='button'
                          className='btn btn-primary m-auto '
                          onClick={() => {
                            importWalletNetwork(address);
                          }}
                        >
                          Analize blockchain
                        </button>
                      </div>

                      <div className='col-3 m-auto mx-0 my-auto h-50 p-auto ms-3  '>
                        <input
                          type='text'
                          className='form-control '
                          placeholder='Etherum address'
                          value={address}
                          onChange={(e) => {
                            setAddress(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              default:
                return null;
            }
          }).call(this)}
        </div>
      </nav>
      <div className='graph-canvas'>
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
                solver: "forceAtlas2Based",
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
      <div id='graphoptions'></div>
    </div>
  );
};
export default Dashboard;
