module.exports = triangle;

function triangle(row) {
  let solution = [...row];
  while (solution.length > 1) {
    solution = solution.reduce((acc, e, i) => {
      if (i === solution.length - 1) return acc;
      return acc.concat([getMerge(e, solution[i + 1])]);
    }, []);
  }
  return solution[0];
}

function getMerge(...params) {
  const [a, b] = params.sort();

  if (a === b) return a;
  if (a === 'B' && b === 'G') return 'R';
  if (a === 'B' && b === 'R') return 'G';
  if (a === 'G' && b === 'R') return 'B';
}
