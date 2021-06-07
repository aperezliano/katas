module.exports = {
  encodeRailFenceCipher,
  decodeRailFenceCipher,
};

function encodeRailFenceCipher(string, numberRails) {
  const queues = new Array(numberRails).fill('');
  let i = 0;
  let asc = false;
  string.split('').forEach((letter) => {
    queues[i] = queues[i] + letter;
    asc = i % (numberRails - 1) === 0 ? !asc : asc;
    i = asc ? i + 1 : i - 1;
  });
  return queues.reduce((acc, str) => acc + str);
}

function decodeRailFenceCipher(string, numberRails) {
  const decipheredString = new Array(string.length).fill('');
  let rail = 0;
  let nextPosition = 0;
  let asc = false;
  string.split('').forEach((e) => {
    decipheredString[nextPosition] = e;
    nextPosition = nextPosition + getOffset(rail, numberRails, asc);

    if (nextPosition > string.length - 1) {
      nextPosition = ++rail;
      asc = false;
    } else {
      asc = !asc;
    }
  });
  return decipheredString.join('');
}

function getOffset(rail, numberRails, asc) {
  // Top and bottom rails
  if (rail === 0 || rail === numberRails - 1) {
    return (numberRails - 2) * 2 + 2;
  }

  // Middle rails
  // Depending if we are ascending or descending, the offset changes
  let r = !asc ? numberRails - rail : rail + 1;
  return (r - 2) * 2 + 2;
}
