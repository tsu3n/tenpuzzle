export const
  NUMBER = 'n',
  ADDITION = '+',
  SUBTRACTION = '-',
  MULTIPLICATION = '*',
  DIVISION = '/',
  LEFT_PARENTHESIS = '(',
  RIGHT_PARENTHESIS = ')',
  ILLEGAL = 'I';

/**
 * スキャン
 * @param {string} input 
 */
export function scanAll(input) {
  const tokens = [];
  let index = 0;

  function next(char) {
    if (isDigit(char)) {
      index++;
      return {
        type: NUMBER,
        value: char
      };
    }

    switch (char) {
      case '+': index++;
        return {
          type: ADDITION,
          value: char
        };
      case '-': index++;
        return {
          type: SUBTRACTION,
          value: char
        };
      case '*': index++;
        return {
          type: MULTIPLICATION,
          value: char
        };
      case '/': index++;
        return {
          type: DIVISION,
          value: char
        };
      case '(': index++;
        return {
          type: LEFT_PARENTHESIS,
          value: char
        };
      case ')':
        index++;
        return {
          type: RIGHT_PARENTHESIS,
          value: char
        };
    }
    index++
    return {
      type: ILLEGAL,
      value: char
    };
  }

  while (index < input.length) {
    let char = input[index];

    tokens.push(next(char))
  }

  return tokens
}

function isDigit(string) {
  return /^\d$/.test(string);
}
