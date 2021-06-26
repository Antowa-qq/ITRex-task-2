const { WALL, WAY, START, COST, DIRECTIONS, OPEN_NODES, VISITED_NODES, ERRORS, node } = require('./constans');

const inOpenNodes = (node) =>
  !!OPEN_NODES.find((item) => item.i === node.i && item.j === node.j && item.g === node.g);

const inVisitedNodes = (node) => !!VISITED_NODES.find((item) => item.i === node.i && item.j === node.j);

const getHeuristic = (i, j) => Math.abs(i - node.end.i) + Math.abs(j - node.end.j);

const getOpenNeighborsNode = (node, maze) => {
  const neighbors = [];
  const { i, j } = node;

  if (maze[i - 1] && maze[i - 1][j]) {
    neighbors.push({
      i: i - 1,
      j,
      h: getHeuristic(i - 1, j),
      direction: DIRECTIONS.top,
    });
  }

  if (maze[i + 1] && maze[i + 1][j]) {
    neighbors.push({
      i: i + 1,
      j,
      h: getHeuristic(i + 1, j),
      direction: DIRECTIONS.bottom,
    });
  }

  if (maze[i][j - 1]) {
    neighbors.push({
      i,
      j: j - 1,
      h: getHeuristic(i, j - 1),
      direction: DIRECTIONS.left,
    });
  }

  if (maze[i][j + 1]) {
    neighbors.push({
      i,
      j: j + 1,
      h: getHeuristic(i, j + 1),
      direction: DIRECTIONS.right,
    });
  }

  return neighbors.filter((neighbor) => maze[neighbor.i][neighbor.j] !== WALL && !inVisitedNodes(neighbor));
};

const setStartNode = (maze) => {
  for (let i = 0; i < maze.length; i += 1) {
    for (let j = 0; j < maze[i].length; j += 1) {
      if (maze[i][j] === START) {
        [node.start.i, node.start.j] = [i, j];
      }
    }
  }
};

const setEndNode = (maze) => {
  for (let i = 0; i < maze[0].length; i += 1) {
    if (maze[0][i] === WAY) {
      [node.end.i, node.end.j] = [0, i];
    }
  }

  for (let i = 0; i < maze[maze.length - 1].length; i += 1) {
    if (maze[maze.length - 1][i] === WAY) {
      [node.end.i, node.end.j] = [maze.length - 1, i];
    }
  }

  for (let i = 0; i < maze.length; i += 1) {
    if (maze[i][0] === WAY) {
      [node.end.i, node.end.j] = [i, 0];
    }
  }

  for (let i = 0; i < maze.length; i += 1) {
    if (maze[i][maze[i].length - 1] === WAY) {
      [node.end.i, node.end.j] = [i, maze[i].length - 1];
    }
  }
};

const buildPath = (toNode) => {
  const path = [];
  while (toNode !== undefined && toNode.direction !== undefined) {
    path.push(toNode.direction);
    toNode = toNode.previous;
  }
  return path;
};

const sortArray = (arr) => arr.sort((a, b) => a.f - b.f);

const findPath = (maze) => {
  setStartNode(maze);
  if (node.start.i === null && node.start.j === null) {
    return ERRORS.invalidStartPoint;
  }

  setEndNode(maze);
  if (node.end.i === null && node.end.j === null) {
    return ERRORS.invalidEndPoint;
  }

  let pathFound = false;
  let path = [];

  OPEN_NODES.push({
    i: node.start.i,
    j: node.start.j,
    g: 0,
    h: 0,
    f: 0,
  });

  while (OPEN_NODES.length > 0) {
    sortArray(OPEN_NODES);

    const currentNode = OPEN_NODES.shift();

    if (currentNode.i === node.end.i && currentNode.j === node.end.j) {
      path = buildPath(currentNode, maze);
      pathFound = true;
      break;
    }

    VISITED_NODES.push(currentNode);

    const neighbors = getOpenNeighborsNode(currentNode, maze);

    for (let i = 0; i < neighbors.length; i += 1) {
      const tempG = currentNode.g + COST;

      if (!inOpenNodes(neighbors[i]) || tempG < neighbors[i].g) {
        neighbors[i].previous = currentNode;
        neighbors[i].g = tempG;
        neighbors[i].f = tempG + neighbors[i].h;
      }
      if (!inOpenNodes(neighbors[i])) {
        OPEN_NODES.push(neighbors[i]);
      }
    }
  }

  if (!pathFound) {
    return ERRORS.pathNotFound;
  }

  return path.reverse();
};

const maze = [
  ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
  ['#', '+', '+', '+', '+', '+', '+', '+', '#'],
  ['#', '+', '#', '+', '+', '+', '#', '+', '#'],
  ['#', '+', '+', '+', '0', '+', '#', '+', '#'],
  ['#', '+', '#', '+', '#', '+', '#', '+', '#'],
  ['#', '+', '+', '+', '#', '+', '+', '+', '#'],
  ['+', '+', '+', '#', '+', '+', '#', '+', '#'],
  ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
];

console.log(findPath(maze));
