module.exports = triangle;

function triangle(row) {
  let currentRow = [...row];
  while (currentRow.length > 1) {
    const nextRow = [];

    for (let i = 1; i < currentRow.length; i++) {
      const mergedColor = getMerge(currentRow[i - 1], currentRow[i]);
      if (mergedColor !== nextRow[i - 1]) {
        nextRow.push(mergedColor);
      }
    }
    currentRow = [...nextRow];
  }
  return currentRow[0];
}

function getMerge(...params) {
  const [a, b] = params.sort();

  if (a === b) return a;
  if (a === 'B' && b === 'G') return 'R';
  if (a === 'B' && b === 'R') return 'G';
  if (a === 'G' && b === 'R') return 'B';
}
