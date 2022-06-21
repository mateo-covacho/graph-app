import React from "react";

function BFS(highlightNode, nodesList, edgeList, startNode, targetNode) {
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

  const queue = [startNode];

  while (queue.length > 0) {
    const currentNode = queue.shift();

    console.log("currentNode: " + currentNode);

    highlightNode(currentNode, "target");

    const connectedNodes = adjacenceyList.get(currentNode);

    // console.log("connectedNodes: " + connectedNodes);

    for (const connectedNode of connectedNodes) {
      if (connectedNode == targetNode) {
        console.log("Found it!");
        console.log(connectedNodes);
      }

      if (!visitedNodes.has(connectedNode)) {
        visitedNodes.add(connectedNode);
        queue.push(connectedNode);
      }
    }
  }
  console.log(visitedNodes);
}

export default BFS;
