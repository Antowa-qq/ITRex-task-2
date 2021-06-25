let maze = [
  ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
  ['#', '+', '+', '+', '#', '+', '+', '+', '#'],
  ['#', '+', '#', '+', '#', '+', '#', '+', '#'],
  ['+', '+', '#', '+', '0', '+', '#', '+', '#'],
  ['#', '#', '#', '+', '#', '#', '#', '#', '#'],
  ['#', '#', '+', '+', '#', '#', '#', '#', '#'],
  ['#', '#', '+', '#', '#', '#', '#', '#', '#'],
  ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
];

const ERRORS = {
  invalidStartPoint: 'Missing starting point',
  invalidEndPoint: 'There is no exit from the maze',
  invalidMap: 'Cannot start a movement because invalid maze',
  errorFindPath: 'Impossible to find a way',
};

const WALL = '#';
const WAY = '+';
const START = '0';
const COST = 1;
const DIRECTIONS = {
  left: 'left',
  right: 'right',
  top: 'top',
  bottom: 'bottom',
};

const OPEN_NODES = [];
const VISITED_NODES = [];

const node = {
  start: { i: null, j: null },
  end: { i: null, j: null },
};

const findPath = (maze) => {
  setStartNode(maze);
  if (node.start.i === null && node.start.j === null) {
    return ERRORS.invalidStartPoint;
  }

  setEndNode(maze);
  if (node.end.i === null && node.end.j === null) {
    return ERRORS.invalidEndPoint;
  }

  //   g(n) — стоимость пути от начальной вершины до любой другой.
  //   h(n) — эвристическое приближение стоимости пути от узла n до конечного узла.
  //   f(n) — минимальная стоимость перехода в соседний узел.
  OPEN_NODES.push({ i: node.start.i, j: node.start.j, g: 0, h: 0, f: 0 });

  while (OPEN_NODES.length > 0) {
    //  !!!!!! SORT ARRAY !!!!  ///
    // sortArray(open);

    const currentNode = OPEN_NODES.shift();

    if (currentNode.i === node.end.i && currentNode.j === node.end.j) {
      console.log(currentNode);
      console.log('finish');
      break;
    }

    VISITED_NODES.push(currentNode);

    const neighbors = getOpenNeighborsNode(currentNode, maze);
    for (let i = 0; i < neighbors.length; i++) {
      const tempG = currentNode.g + 1;

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
};

const getOpenNeighborsNode = (node, maze) => {
  const neighbors = [];
  const { i, j } = node;

  // top
  if (maze[i - 1] && maze[i - 1][j]) {
    neighbors.push({ i: i - 1, j, h: getHeuristic(i - 1, j) });
  }

  //bottom
  if (maze[i + 1] && maze[i + 1][j]) {
    neighbors.push({ i: i + 1, j, h: getHeuristic(i + 1, j) });
  }

  // left
  if (maze[i][j - 1]) {
    neighbors.push({ i, j: j - 1, h: getHeuristic(i, j - 1) });
  }

  // right
  if (maze[i][j + 1]) {
    neighbors.push({ i, j: j + 1, h: getHeuristic(i, j + 1) });
  }

  return neighbors.filter((neighbor) => maze[neighbor.i][neighbor.j + 1] !== WALL && !inVisitedNodes(neighbor));
};

const inOpenNodes = (node) => {
  return !!OPEN_NODES.find((item) => item.i === node.i && item.j === node.j && item.g === node.g);
};

const inVisitedNodes = (node) => {
  return !!VISITED_NODES.find((item) => item.i === node.i && item.j === node.j);
};

const getHeuristic = (i, j) => {
  return Math.abs(i - node.end.i) + Math.abs(j - node.end.j);
};

const setStartNode = (maze) => {
  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[i].length; j++) {
      if (maze[i][j] === START) {
        [node.start.i, node.start.j] = [i, j];
      }
    }
  }
};

const setEndNode = (maze) => {
  for (let i = 0; i < maze[0].length; i++) {
    if (maze[0][i] === WAY) {
      [node.end.i, node.end.j] = [0, i];
    }
  }

  for (let i = 0; i < maze[maze.length - 1].length; i++) {
    if (maze[maze.length - 1][i] === WAY) {
      [node.end.i, node.end.j] = [maze.length - 1, i];
    }
  }

  for (let i = 0; i < maze.length; i++) {
    if (maze[i][0] === WAY) {
      [node.end.i, node.end.j] = [i, 0];
    }
  }

  for (let i = 0; i < maze.length; i++) {
    if (maze[i][maze[i].length - 1] === WAY) {
      [node.end.i, node.end.j] = [i, maze[i].length - 1];
    }
  }
};

console.log(findPath(maze));