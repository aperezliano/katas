module.exports = longestSlideDown;

function longestSlideDown(pyramid) {
  if (!pyramid || pyramid.length === 0) return null;
  const pyramidCopy = [...pyramid].map((e) =>
    [...e].map((value) => ({ value, maxSum: 0, done: false }))
  );

  return longestSlideDownRec(pyramidCopy, 0, 0);
}

function longestSlideDownRec(pyramid, level, index) {
  const element = pyramid[level][index];
  if (element.done) return element.maxSum;

  if (level === pyramid.length - 1) {
    element.maxSum = pyramid[level][index].value;
  } else {
    const nextIndex = Math.min(index + 1, pyramid[level + 1].length - 1);
    element.maxSum =
      element.value +
      Math.max(
        longestSlideDownRec(pyramid, level + 1, index),
        longestSlideDownRec(pyramid, level + 1, nextIndex)
      );
  }

  element.done = true;
  return element.maxSum;
}
