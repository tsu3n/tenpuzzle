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

/**
 * パース
 */
// export function parse(input) {
//   console.error(aaa(p(scanAll(input)).map(v => isDigit(v.value) ? Number(v.value) : v.value)))
//   return p(scanAll(input)).map(v => isDigit(v.value) ? Number(v.value) : v.value);

// }

/*
const regex = /(\d+)|([\+\-\*\/\(\)])|([^\d\+\-\*\/\(\)\s]+)|(\s+)/;
  return string.split(regex)
    .filter(Boolean)
    .map(token => {
      switch (token) {
        case '+':
          
      }
    });*/

function isDigit(string) {
  return /^\d$/.test(string);
}

// // 
// function p(tokens) {
//   const output = [];
//   const stack = [];

//   for (const token of tokens) {
//     const type = token.type;

//     switch (type) {
//       case NUMBER:
//         output.push(token);
//         break;
//       case ADDITION:
//       case SUBTRACTION:
//       case MULTIPLICATION:
//       case DIVISION:
//         while (stack.length > 0 &&
//           precedence(stack[stack.length - 1]) >= precedence(token)) {
//           output.push(stack.pop());
//         }
//         stack.push(token);
//         break;
//       case LEFT_PARENTHESIS:
//         stack.push(token);
//         break;
//       case RIGHT_PARENTHESIS:
//         while (stack.length > 0 && stack[stack.length - 1].type !== LEFT_PARENTHESIS) {
//           output.push(stack.pop());
//         }
//         stack.pop();
//         break;
//     }
//   }

//   return output.concat(stack);
// }

// function precedence(token) {
//   switch (token.type) {
//     case ADDITION:
//     case SUBTRACTION:
//       return 1;
//     case MULTIPLICATION:
//     case DIVISION:
//       return 2;
//     default:
//       return 0;
//   }
// }
