module.exports = equalTo24;

function equalTo24(a, b, c, d) {
  const solution = equalTo24Rec(
    [a, b, c, d].map((e) => ({ value: e, expression: `${e}` }))
  );
  return solution ? solution : "It's not possible!";
}

function equalTo24Rec(numbers) {
  if (numbers.length === 2) {
    const combinations = getCombinations(numbers[0], numbers[1]);
    const result = combinations.find((e) => e.value === 24);
    return result ? result.expression : false;
  }

  const pairs = getPairs(numbers);

  for (let pair of pairs) {
    const combinations = getCombinations(...pair);

    for (let combination of combinations) {
      const newNumbers = numbers
        .filter(
          (e, i) =>
            isFinite(e.value) && !pair.map((e) => e.position).includes(i)
        )
        .concat([combination]);
      const result = equalTo24Rec(newNumbers);

      if (result) return result;
    }
  }

  return false;
}

function getPairs(numbers) {
  let pairs = [];
  for (let i = 0; i < numbers.length - 1; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      pairs.push([
        { ...numbers[i], position: i },
        { ...numbers[j], position: j },
      ]);
    }
  }
  return pairs;
}

function getCombinations(a, b) {
  const combinations = [
    {
      value: a.value * b.value,
      expression: `(${a.expression}*${b.expression})`,
    },
    {
      value: a.value + b.value,
      expression: `(${a.expression}+${b.expression})`,
    },
  ];
  if (a.value > b.value) {
    combinations.push({
      value: a.value - b.value,
      expression: `(${a.expression}-${b.expression})`,
    });
  } else {
    combinations.push({
      value: b.value - a.value,
      expression: `(${b.expression}-${a.expression})`,
    });
  }
  if (b !== 0) {
    combinations.push({
      value: a.value / b.value,
      expression: `(${a.expression}/${b.expression})`,
    });
  }
  if (a !== 0) {
    combinations.push({
      value: b.value / a.value,
      expression: `(${b.expression}/${a.expression})`,
    });
  }
  return combinations;
}
