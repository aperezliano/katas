module.exports = longestSlideDown;

function longestSlideDown(pyramid) {
  if (!pyramid || pyramid.length === 0) return null;
  return pyramid.reduceRight((previousRow, currentRow) =>
    currentRow.map((e, i) => e + Math.max(previousRow[i], previousRow[i + 1]))
  )[0];
}
