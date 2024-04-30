import React, { useState, useEffect, useRef } from "react";
import "./dashboard.css";
import Graph from "react-graph-vis";
import { graphNodes, graphEdges, graphNodesBasic, defaultInput, network_graph_analisis } from "./data/GraphData.jsx";
// import "./network.css";
// import "./styles.css";
//___________________________________________
import { AiOutlineHome, AiFillQuestionCircle } from "react-icons/ai";
import { BiNetworkChart } from "react-icons/bi";
import { GrInstagram } from "react-icons/gr";
import { FaBitcoin, FaInfoCircle } from "react-icons/fa";
import { GiPathDistance } from "react-icons/gi";
import { FiDownload } from "react-icons/fi";
import { IoStarSharp, IoReloadCircleSharp, IoTriangle } from "react-icons/io5";
import { BsFillDiamondFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Button, Modal, ToggleButton, Dropdown } from "react-bootstrap";
//___________________________________________
import AWS from "aws-sdk";
//___________________________________________


const Dashboard = () => {
  const [completionData, setCompletionData] = useState({ nodes: null, completionTime: null, algorithmText: "" });

  const [eventsState, setEventsState] = useState({});
  const [checked, setChecked] = useState(true);

  const [dataInput, setDataInput] = useState(defaultInput);


  // Info MODAL
  const [showInfoModal, setShowInfoModal] = useState(false);
  const startNodeRef = useRef();
  const targetNodeRef = useRef();
  const handleClose = () => setShowInfoModal(false);
  const handleShow = () => setShowInfoModal(true);


  // toolbar
  const [iconbarColor, setIconbarColor] = useState("#9149b6");
  const [toolBar, setToolBar] = useState("blockchain");
  const [buttonActive, setButtonActive] = useState();

  // algorithm
  const [algorithm, setAlgorithm] = useState("Choose algorithm");
  const [algorithmText, setAlgorithmText] = useState("");
  const [startingNodeState, setStartingNodeState] = useState();
  const [targetNodeState, setTargetNodeState] = useState();
  var startingNode;
  var targetNode;


  // graph
  const [network, setNetwork] = useState(null);
  const [graphState, setGraphState] = useState({
    counter: 76,

    graph: {
      nodes: graphNodesBasic,
      edges: graphEdges,
    },
  });

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
    console.log({ getNodesId });

    setGraphState(({ graph: { nodes, edges }, counter, ...rest }) => {
      const id = counter + 1;
      counter++;
      const from = Math.floor(Math.random() * 10);

      function getDefaultGroup(nodeId) {
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
            group: getDefaultGroup(node.id),
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
    setGraphState(({ graph: { nodes, edges }, counter, ...rest }) => {
      const newEdges = edges.map((edge) => {
        if ((edge.from == node1 && edge.to == node2) || (edge.from == node1 && edge.to == node2)) {
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

  function highlight_multiple_edges(edgesArray) {
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

  async function highlight_multiple_edges_sequential(edgesArray) {
    for (let i = 0; i < edgesArray.length; i++) {
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
  }

  function BFS(nodesList, edgeList, startNode, targetNode) {
    setAlgorithmText("BFS algorithm always shows you the shortest path but is more resource intensive and takes longer.");
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

    // console.log(adjacenceyList);
    const visitedNodes = new Set();

    const queue = [startNode];
    let prev = Array(graphState.graph.nodes.length);
    // console.log("prev: " + prev);
    visitedNodes.add(startNode);
    while (queue.length > 0) {
      const currentNode = queue.shift();
      // console.log("currentNode: " + currentNode);

      const connectedNodes = adjacenceyList.get(currentNode);

      if (currentNode == targetNode) {
        // console.log("Found it!");
        visitedNodes.delete(startNode);
        visitedNodes.delete(targetNode);
        // console.log("visited: ", visitedNodes);
        highlightNode([...visitedNodes], "selected", 1000);

        let path = [];
        // console.log(prev);

        let i;
        for (i = targetNode; i != startNode; i = prev[i]) {
          path.push(prev[i]);
        }

        path.reverse();
        path = [...path, targetNode];

        highlight_multiple_edges(path);

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
    setAlgorithmText("DFS algorithm doesn't always show you the shortest path but has to search through fewer nodes, so it completes faster");
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
      visited.add(start);
      let conections = adjacenceyList.get(start);

      var result = false;

      for (const conection of conections) {
        if (conection == targetNode && !finished) {
          finished = true;
          visited.delete(startNode);
          visited.delete(targetNode);
          highlightNode([...visited], "selected", 1000);
          path = [startNode, ...path, targetNode];
          highlight_multiple_edges(path);
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

  function handleStartButton() {
    if (algorithm == "Breath first search") {
      BFS(graphState.graph.nodes, graphState.graph.edges, parseInt(startingNodeState), parseInt(targetNodeState));
    } else if (algorithm == "Depth first search") {
      DFS(graphState.graph.nodes, graphState.graph.edges, parseInt(startingNodeState), parseInt(targetNodeState));
    }
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

  function getAmzDate() {
    const date = new Date();
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');

    return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
  }


  function setGraphData(graph_name) {
    if (graph_name == "Les miserables") {
      setGraphState({
        graph: {
          nodes: graphNodesBasic,
          edges: graphEdges,
        },
      });
    } else if (graph_name == "Network data analisis") {
      setGraphState({
        graph: {
          nodes: network_graph_analisis.nodes,
          edges: network_graph_analisis.edges,
        },
      });
    }
  }
  function getLabelOfid(id) {
    let label;
    graphState.graph.nodes.forEach((node, index) => {
      if (node.id == id) {
        label = node.label;
        return;
      }
    });

    return label;
  }


  // blockchain

  const { REACT_APP_ACCESS_KEY_ID, REACT_APP_SECRET_ACCESS_KEY } = process.env;
  console.log(process.env);
  console.log("key", REACT_APP_ACCESS_KEY_ID);
  AWS.config.update({
    region: 'eu-central-1',
    credentials: new AWS.Credentials({
      accessKeyId: REACT_APP_ACCESS_KEY_ID,  // Use environment variables or AWS IAM roles if possible
      secretAccessKey: REACT_APP_SECRET_ACCESS_KEY  // Use environment variables or AWS IAM roles if possible
    })
  });


  const [address, setAddress] = useState("0x5d2b684D9D741148a20EE7A06622122ec32cfeE3");
  const [analyzeTargetBlockchain, setAnalyzeTargetBlockchain] = useState("Choose target blockchain");
  const ethWalletRegex = /^0x[a-fA-F0-9]{40}$/;


  function importWalletNetwork(walletAddress, retries) {
    if (!walletAddress.match(ethWalletRegex)) {
      alert("Please enter a valid Ethereum address");
      return;
    }

    // AWS Lambda configuration
    const lambda = new AWS.Lambda();
    const params = {
      FunctionName: 'getEthWalletTransactionsTS-staging',
      InvocationType: 'RequestResponse',
      Payload: JSON.stringify({ wallet: walletAddress })
    };

    lambda.invoke(params, function(err, data) {
      if (err) {
        console.log(err, err.stack);
        alert("Failed to invoke Lambda function");
      } else {

        const payload = JSON.parse(data.Payload);
        console.log(payload);
        if (payload === undefined) {
          alert("Please try with a different Ethereum address");
        } else {
          const object = JSON.parse(payload.body);
          console.log(object);
          setGraphState({
            graph: { nodes: object.nodes, edges: object.edges },
            counter: graphState.counter,
          });
        }
      }
    });
  }
  // function importWalletNetwork(walletAddress, retries) {
  //   if (!walletAddress.match(ethWalletRegex)) {
  //     alert("Please enter an Eth address");
  //   }
  //   const myHeaders = new Headers();
  //   myHeaders.append("X-Amz-Date", getAmzDate());
  //   myHeaders.append("Authorization", "AWS4-HMAC-SHA256 Credential=AKIAWM2JFVHIT6V2ORUA/20240427/eu-central-1/lambda/aws4_request, SignedHeaders=host;x-amz-date, Signature=ff54fd5bd5f0d5413c0bc024e4d2869e6b8803d288b693cb87bdecb3f61a9167");
  //
  //   const requestOptions = {
  //     method: "GET",
  //     headers: myHeaders,
  //     redirect: "follow"
  //   };
  //
  //   fetch("https://l2orcjw4s3a7wak6dwoliy2r5u0devxj.lambda-url.eu-central-1.on.aws/?wallet=0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5", requestOptions)
  //     .then((response) => {
  //       if (response.nodes == undefined) {
  //         return;
  //       }
  //       if (response.ok) {
  //         return response.json();
  //       }
  //       if (retries > 0) {
  //         return importWalletNetwork(walletAddress, retries - 1);
  //       }
  //       alert("Please try with different eth address");
  //     })
  //     .then((data) => {
  //       setGraphState({
  //         graph: { nodes: data.nodes, edges: data.edges },
  //         counter: graphState.counter,
  //       });
  //     });
  // }


  return (
    <div className='container-fluid p-0'>
      <nav className='navbar navbar-light bg-light p-0 '>
        <div className='iconss-bar col-12 row  gx-0 blacksvg' style={{ backgroundColor: iconbarColor }}>
          {/* Home button */}
          <Link to='/'>
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
              setIconbarColor("#41be8a");
            }}
            className='row col-2 col-lg-1 gx-0 '
          >
            <BiNetworkChart className='col-2 icon my-2  my-auto' />
            <p className=' my-auto col align-bottom  '>Graph</p>
          </div>

          {/* Social
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              setToolBar("social_media");
              setIconbarColor("#8dd52a");
            }}
            className='row col-2 col-lg-1 gx-0 '
          >
            <GrInstagram className='col-2 icon my-2 my-auto' />
            <p className=' my-auto col align-bottom  '>Social</p>
          </div> */}

          {/* Algorithm */}
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              setToolBar("algorithm");
              setIconbarColor("#35608b");
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
              setIconbarColor("#9149b6");
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
                      <div className=' dropdown ms-4 my-auto ps-0 col-2 '>
                        <button
                          className='btn btn-primary dropdown-toggle'
                          type='button'
                          id='dropdownMenuButton'
                          data-bs-toggle='dropdown'
                          aria-expanded='false'
                        >
                          Select graph
                        </button>
                        <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
                          <li
                            onClick={() => {
                              setGraphData("Les miserables");
                            }}
                          >
                            <div className='dropdown-item'>Les miserables</div>
                          </li>

                          <li
                            onClick={() => {
                              setGraphData("Network data analisis");
                            }}
                          >
                            <div className='dropdown-item'>Network data analisis</div>
                          </li>
                        </ul>
                      </div>
                      <div className='col-2 d-flex justify-content-center '>
                        <Button
                          type='button'
                          className='btn btn-primary m-auto '
                          style={{ backgroundColor: buttonActive == "Data" ? "red" : "" }}
                          onClick={() => {
                            if (buttonActive == "Data") {
                              setButtonActive();

                              setEventsState({
                                events: {},
                              });
                            } else {
                              setButtonActive("Data");
                            }
                          }}
                        >
                          Import data
                        </Button>
                        <Modal show={buttonActive == "Data"} size='lg'>
                          <Modal.Header>
                            <div className='container-fluid'>
                              <div className='row'>
                                <div className='col'>
                                  <h2 className='blacktext display-3'>Import data</h2>
                                </div>
                              </div>
                            </div>
                          </Modal.Header>
                          <Modal.Body>
                            <div className='container'>
                              <div className='row mb-2'>
                                <Button className='col-2 display-3'>
                                  <a href='exampleData.json' download>
                                    <div className='row w-100 m-0'>
                                      <div className='col-8'>Example</div>
                                      <div className='col-2 whitesvg'>
                                        <FiDownload />
                                      </div>
                                    </div>
                                  </a>
                                </Button>
                              </div>
                              <div className='row mb-4'>
                                <h3 className='blacktext col-3 ps-0'>Data</h3>
                              </div>
                              <div className='row mb-4'>
                                <textarea
                                  type='text'
                                  style={{ height: "20vh", color: "black" }}
                                  value={dataInput}
                                  placeholder={defaultInput}
                                  onChange={(e) => {
                                    setDataInput(e.target.value);
                                  }}
                                />
                              </div>
                            </div>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              variant='primary'
                              onClick={() => {
                                // setButtonActive();
                                // console.log(JSON.parse(dataInput));
                                let data = JSON.parse(dataInput);
                                setGraphState({ graph: { edges: data.edges, nodes: data.nodes } });
                              }}
                            >
                              Set data
                            </Button>
                            <Button
                              variant='primary'
                              onClick={() => {
                                setButtonActive();
                              }}
                            >
                              Close
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </div>
                      <div className='col-2 d-flex justify-content-center '>
                        <Button
                          type='button'
                          className='btn btn-primary m-auto '
                          style={{ backgroundColor: buttonActive == "remove" ? "red" : "" }}
                          onClick={() => {
                            if (buttonActive == "remove") {
                              setButtonActive();

                              setEventsState({
                                events: {},
                              });
                            } else {
                              setButtonActive("remove");
                              setEventsState({
                                events: {
                                  click: ({ nodes: clickedNodes, edges: clickedEdges }) => {
                                    setGraphState(({ graph: { nodes, edges }, counter }) => {
                                      const newNodes = nodes.filter((node) => {
                                        // console.log(clickedNodes[0]);
                                        // console.log(node.id);
                                        if (node.id !== clickedNodes[0]) {
                                          return node;
                                        }
                                      });

                                      // console.log(newNodes);

                                      return { graph: { nodes: newNodes, edges: edges }, counter: counter };
                                    });
                                  },
                                },
                              });
                            }
                          }}
                        >
                          Remove nodes
                        </Button>
                      </div>
                      <div className='col-2 d-flex justify-content-center'>
                        <input
                          list='browsers'
                          name='browser'
                          className='form-control h-50 m-auto'
                          placeholder='Node search'
                          onChange={(e) => {
                            network.focus(e.target.value, {
                              animation: {
                                duration: 700,
                                easingFunction: "easeInQuad",
                              },
                            });
                          }}
                        />
                        <datalist id='browsers'>
                          {graphState.graph.nodes.map((node) => {
                            return (
                              <option value={node.id} onClick={() => { }}>
                                {node.label}
                              </option>
                            );
                          })}
                        </datalist>
                      </div>
                      <div className='col-1 d-flex h-50 my-auto justify-content-center align-items-center'>
                        <ToggleButton
                          className=' h-75 m-auto d-flex align-items-center   '
                          id='toggle-check'
                          type='checkbox'
                          variant='outline-primary'
                          checked={checked}
                          value='1'
                          onChange={(e) => {
                            if (checked) {
                              network.setOptions({ physics: false });
                            } else {
                              network.setOptions({ physics: true });
                            }
                            setChecked(e.currentTarget.checked);
                          }}
                        >
                          Physics
                        </ToggleButton>
                      </div>
                      <div className='col-2 d-flex justify-content-center '>
                        <Button
                          type='button'
                          className='btn btn-primary m-auto '
                          style={{ backgroundColor: buttonActive == "copy" ? "red" : "" }}
                          onClick={() => {
                            if (buttonActive == "copy") {
                              setButtonActive();

                              setEventsState({
                                events: {},
                              });
                            } else {
                              setButtonActive("copy");
                              setEventsState({
                                events: {
                                  click: ({ nodes, edges }) => {
                                    navigator.clipboard.writeText(getLabelOfid(nodes));
                                  },
                                },
                              });
                            }
                          }}
                        >
                          Copy label
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              case "social_media":
                return (
                  <div className='container-fluid '>
                    <div className='row buttons_row'>Coming soon</div>
                  </div>
                );
              case "algorithm":
                return (
                  <div className='container-fluid '>
                    <div className='row buttons_row' style={{ height: "5vh" }}>
                      <div className=' dropdown ms-4 my-auto ps-0 col-2 '>
                        <button
                          className='btn btn-primary dropdown-toggle'
                          type='button'
                          id='dropdownMenuButton'
                          data-bs-toggle='dropdown'
                          aria-expanded='false'
                        >
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
                          value={startingNodeState}
                          onChange={(e) => {
                            startingNode = e.target.value;
                            setStartingNodeState(startingNode);

                            highlightNode([startingNode], "start");
                          }}
                          ref={startNodeRef}
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
                      <div className='col-1 d-flex justify-content-center h-50 my-auto'>
                        <Button
                          variant='primary'
                          size='sm'
                          style={{ backgroundColor: buttonActive == "set start" ? "red" : "" }}
                          onClick={() => {
                            if (buttonActive == "set start") {
                              setButtonActive();

                              setEventsState({
                                events: {},
                              });
                            } else {
                              setButtonActive("set start");
                              setEventsState({
                                events: {
                                  click: (prop) => {
                                    startingNode = prop.nodes[0];
                                    setStartingNodeState(startingNode);

                                    highlightNode([startingNode], "start");
                                  },
                                },
                              });
                            }
                          }}
                        >
                          Set start
                        </Button>
                      </div>
                      <div className='col-2 d-flex justify-content-center h-50 my-auto'>
                        <select
                          aria-label='Small select'
                          className='form-select form-select-sm'
                          value={targetNodeState}
                          onChange={(e) => {
                            targetNode = e.target.value;
                            setTargetNodeState(targetNode);

                            highlightNode([targetNode], "target");
                            // let pastStartingNode = targetNode
                          }}
                          ref={targetNodeRef}
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
                      <div className='col-1 d-flex justify-content-center h-50 my-auto'>
                        <Button
                          variant='primary'
                          size='sm'
                          style={{ backgroundColor: buttonActive == "set target" ? "red" : "" }}
                          onClick={() => {
                            if (buttonActive == "set target") {
                              setButtonActive();

                              setEventsState({
                                events: {},
                              });
                            } else {
                              setButtonActive("set target");
                              setEventsState({
                                events: {
                                  click: (prop) => {
                                    targetNode = prop.nodes[0];
                                    setTargetNodeState(targetNode);

                                    highlightNode([targetNode], "target");
                                  },
                                },
                              });
                            }
                          }}
                        >
                          Set target
                        </Button>
                      </div>
                      <div className='col-1 d-flex justify-content-center'>
                        <button
                          type='button'
                          className='btn btn-success m-auto '
                          onClick={() => {
                            handleStartButton();
                          }}
                          variant='success'
                        >
                          Start
                        </button>
                      </div>
                      <div className='col-2 row'>
                        <div className='col-5  my-auto h-50 blacksvg p-auto justify-content-center '>
                          <IoReloadCircleSharp
                            className='col-6   h-100 my-auto'
                            onClick={() => {
                              setGraphData("Les miserables");
                              network.redraw();
                            }}
                          />
                        </div>
                        <div className='col-6 mx-0 my-auto h-50   blacksvg '>
                          <AiFillQuestionCircle onClick={handleShow} className='col-5   h-100 my-auto' />

                          <Modal show={showInfoModal} onHide={handleClose} animation={true} centered>
                            <Modal.Header closeButton>
                              <Modal.Title className='blacktext'>Info</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <div className='row blacktext mb-4  '>
                                <div className=' m-0 p-0 mx-0 w-auto col-1  d-flex align-items-center'>
                                  <BsFillDiamondFill size='30px' />
                                </div>
                                <div className='blacktext col-11 align-middle class align-items-center  d-flex'>
                                  The diamond node indicates the starting node
                                </div>
                              </div>
                              <div className='row blacktext mb-4 '>
                                <div className=' m-0 p-0 mx-0 w-auto col-1  d-flex align-items-center'>
                                  <IoStarSharp size='30px' />
                                </div>
                                <div className='blacktext col-11 align-middle class align-items-center  d-flex'>
                                  The star node indicates the target node
                                </div>
                              </div>
                              <div className='row blacktext mb-4 '>
                                <div className=' m-0 p-0 mx-0 w-auto col-1 icon-flipped d-flex align-items-center'>
                                  <IoTriangle className='rotate-90' size='30px' />
                                </div>
                                <div className='blacktext col-11 align-middle class align-items-center  d-flex'>
                                  The upside-down triangle node indicates nodes the algorithm has passed through
                                </div>
                              </div>
                            </Modal.Body>
                            <Modal.Body className='blacktext container-fluid'>
                              <div className='row  '>
                                <p className='blacktext px-4'> To set a target node simply double-click on it</p>
                              </div>
                              <br />
                              <div className='row  '>
                                <p className='blacktext px-4'> To set a start node simply click on it</p>
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
                      <div className='col-1 d-flex justify-content-center '>
                        <Button
                          type='button'
                          className='btn btn-primary m-auto '
                          style={{ backgroundColor: buttonActive == "info" ? "red" : "" }}
                          onClick={() => {
                            if (buttonActive == "info") {
                              setButtonActive();

                              setEventsState({
                                events: {},
                              });
                            } else {
                              setButtonActive("info");
                            }
                          }}
                        >
                          Data
                        </Button>
                        <Modal show={buttonActive == "info"} size='lg'>
                          <Modal.Header>
                            <div className='container-fluid'>
                              <div className='row'>
                                <div className='col'>
                                  <h4 className='blacktext display-4'>Completion info</h4>
                                </div>
                              </div>
                            </div>
                          </Modal.Header>
                          <Modal.Body>
                            <div className='container'>
                              <div className='row mb-2 blacktext'>{algorithmText}</div>
                            </div>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              variant='primary'
                              onClick={() => {
                                setButtonActive();
                              }}
                            >
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
                  <div className='container-fluid p-0'>
                    <div className='row buttons_row '>
                      <div className='col m-auto h-50'>
                        <Dropdown>
                          <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            {analyzeTargetBlockchain}
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => { setAnalyzeTargetBlockchain("Etherum") }}>Etherum</Dropdown.Item>
                            {/* <Dropdown.Item onClick={()=>{setAnalyzeTargetBlockchain("Polygon")}}>Polygon</Dropdown.Item> */}
                            {/* <Dropdown.Item onClick={()=>{setAnalyzeTargetBlockchain("Starknet")}}>Starknet</Dropdown.Item> */}
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>

                      <div className='col m-auto h-50'>
                        <button
                          type='button'
                          className='btn btn-primary mx-auto '
                          onClick={() => {
                            importWalletNetwork(address, 3);
                          }}
                        >
                          Import transaction data
                        </button>
                      </div>

                      <div className='col m-auto h-50'>
                        <input
                          type='text'
                          className='form-control '
                          placeholder='Etherum / Starknet wallet '
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
            setNetwork(network);
            network.setOptions({
              autoResize: true,
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
                enabled: true,
                forceAtlas2Based: {
                  gravitationalConstant: -87,
                  springLength: 100,
                  damping: 1,
                  avoidOverlap: 1,
                },
                minVelocity: 0.75,
                solver: "forceAtlas2Based",
              },
              groups: {
                1: { shape: "triangle", color: "green", background: "red" },
                2: { shape: "dot" },
                3: { shape: "dot" },
                4: { shape: "dot" },
                5: { shape: "dot" },
                6: { shape: "dot" },
                7: { shape: "dot" },
                8: { shape: "dot" },
                9: { shape: "dot" },
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
