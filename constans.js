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

const ERRORS = {
  invalidStartPoint: 'Missing starting point',
  invalidEndPoint: 'There is no exit from the maze',
  pathNotFound: 'Path not found',
};

const OPEN_NODES = [];
const VISITED_NODES = [];

const node = {
  start: { i: null, j: null },
  end: { i: null, j: null },
};

module.exports = { WALL, WAY, START, COST, DIRECTIONS, OPEN_NODES, VISITED_NODES, node, ERRORS };
