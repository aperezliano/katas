module.exports = equalTo24;

function equalTo24(a, b, c, d) {
  return equalTo24Rec([a, b, c, d]);
}

function equalTo24Rec(numbers, result = '') {
  if (numbers.length === 2) {
    const combinations = getCombinations(numbers[0], numbers[1]);
    const [_, expression] = combinations.find((e) => e[0] === 24) || [];
    return expression ? true : false;
  }

  const pairs = getPairs(numbers);

  for (let pair of pairs) {
    const combinations = getCombinations(...pair);

    for (let [combination, expression] of combinations) {
      const newNumbers = numbers
        .filter((e) => isFinite(e) && !pair.includes(e))
        .concat([combination]);
      const result = equalTo24Rec(newNumbers, expression);

      if (result) return result;
    }
  }

  return false;
}

function getPairs(digits) {
  const numbers = digits.filter((e) => isFinite(e));
  let pairs = [];
  for (let i = 0; i < numbers.length - 1; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      pairs.push([numbers[i], numbers[j]]);
    }
  }
  return pairs;
}

function getCombinations(a, b) {
  const combinations = [
    [a * b, `${a}*${b}`],
    [a + b, `${a}+${b}`],
  ];
  if (a > b) {
    combinations.push([a - b, `${a}-${b}`]);
  } else {
    combinations.push([b - a, `${b}-${a}`]);
  }
  if (b !== 0) {
    combinations.push([a / b, `${a}/${b}`]);
  }
  if (a !== 0) {
    combinations.push([b / a, `${b}/${a}`]);
  }
  return combinations;
}
