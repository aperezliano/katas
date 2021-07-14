function reverseInParentheses(inputString) {
  return reverseInParenthesesRec([...inputString]).chars.join('');
}

/**
 *
 * @param {string[]} inputChars
 */
function reverseInParenthesesRec(inputChars) {
  let i = 0;
  const result = [];
  while (i < inputChars.length) {
    const char = inputChars[i];
    if (char === '(') {
      const reversed = reverseInParenthesesRec(inputChars.slice(i + 1));
      result.push(...reversed.chars);
      i += reversed.i + 2;
    } else if (char === ')') {
      return { chars: result.reverse(), i };
    } else {
      result.push(char);
      i++;
    }
  }
  return { chars: result, i };
}

module.exports = reverseInParentheses;
