module.exports = checkPipe;

const UP_PIPES = [9495, 9499, 9475, 9507, 9515, 9531, 9547];
const DOWN_PIPES = [9491, 9487, 9475, 9507, 9515, 9523, 9547];

const RIGH_PIPES = [9495, 9487, 9473, 9507, 9523, 9531, 9547];
const LEFT_PIPES = [9491, 9499, 9473, 9515, 9523, 9531, 9547];

function checkUp(map, y, x) {
  return (
    isOutOfBounds(map, y - 1, x) || DOWN_PIPES.includes(map[y - 1][x].code)
  );
}

function checkDown(map, y, x) {
  return isOutOfBounds(map, y + 1, x) || UP_PIPES.includes(map[y + 1][x].code);
}

function checkRight(map, y, x) {
  return (
    isOutOfBounds(map, y, x + 1) || LEFT_PIPES.includes(map[y][x + 1].code)
  );
}

function checkLeft(map, y, x) {
  return (
    isOutOfBounds(map, y, x - 1) || RIGH_PIPES.includes(map[y][x - 1].code)
  );
}

function isOutOfBounds(map, y, x) {
  return y < 0 || y >= map.length || x < 0 || x >= map[y].length;
}

function checkPipe(map) {
  const pipesMap = map.map((y, posY) =>
    [...y].map((x, posX) => ({
      code: x.charCodeAt(),
      checked: false,
      x: posX,
      y: posY,
    }))
  );

  const startingPoints = [
    ...pipesMap[0].filter((pipe) => UP_PIPES.includes(pipe.code)),
    ...pipesMap[pipesMap.length - 1].filter((pipe) =>
      DOWN_PIPES.includes(pipe.code)
    ),
    ...pipesMap
      .map((pipes) => pipes[0])
      .filter((pipe) => LEFT_PIPES.includes(pipe.code)),
    ...pipesMap
      .map((pipes) => pipes[pipes.length - 1])
      .filter((pipe) => RIGH_PIPES.includes(pipe.code)),
  ];

  return startingPoints.every(({ y, x }) => isConnected(y, x, pipesMap));
}

function isConnected(y, x, map) {
  if (isOutOfBounds(map, y, x)) {
    return true;
  }

  const pipe = map[y][x];
  if (pipe.checked) return true;
  map[y][x].checked = true;

  let connected = true;
  if (UP_PIPES.includes(pipe.code))
    connected = checkUp(map, y, x) && isConnected(y - 1, x, map);
  if (connected && DOWN_PIPES.includes(pipe.code))
    connected = checkDown(map, y, x) && isConnected(y + 1, x, map);
  if (connected && LEFT_PIPES.includes(pipe.code))
    connected = checkLeft(map, y, x) && isConnected(y, x - 1, map);
  if (connected && RIGH_PIPES.includes(pipe.code))
    connected = checkRight(map, y, x) && isConnected(y, x + 1, map);
  return connected;
}
