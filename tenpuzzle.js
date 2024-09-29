'use strict';

const SOLUTION = 10;

/**
 * 問題を生成する
 * @returns {number[]}
 */
export function generateQuestion() {
  while (true) {
    const numbers = generateRandomNumbers(0, 9, 4);

    if (isCanMake10(...numbers)) {
      return numbers;
    }
  }
}

/**
 * 答え合わせ
 * @param {string} answer ユーザー回答
 * @param {number[]} question 
 * @returns {boolean}
 */
export function isCorrect(answer, question) {
  if (!isValidAnswer(answer, question)) {
    throw new ValidationError();
  }

  const evaluate = new Function(`return ${answer};`);

  const result = evaluate();
  if (result !== SOLUTION) {
    throw new IncorrectError('The result is not ten', result);
  }

  return true;
}

/**
 * 
 * @param {string} answer 
 * @param {number[]} questionNumbers
 * @returns {boolean}
 */
function isValidAnswer(answer, questionNumbers) {
  // 数字
  const answerNumbers = extractNumbers(answer)
  if (!arraysAreEqual(answerNumbers, questionNumbers)) {
    return false;
  }

  // 括弧
  if (!isBalancedParentheses(answer)) {
    return false;
  }

  // 式
  if (!/^\(*\d(?:\)*[\+\-\*\/]\(*\d){3}\)*$/.test(answer)) {
    return false;
  }

  return true;
}

/**
 * @param {number} min
 * @param {number} max
 * @param {number} length 
 * @returns {number[]}
 */
function generateRandomNumbers(min, max, length) {
  return Array.from({ length }, () => Math.floor(Math.random() * (max - min) + min));
}

/**
 * 文字列から数字だけ抜き出す
 * @param {string} text
 * @returns {number[]}
 */
function extractNumbers(text) {
  const numbers = text.match(/\d/g);
  return numbers ? numbers.map(char => Number(char)) : [];
}

/**
 * @param {Array} array1 
 * @param {Array} array2 
 * @returns {boolean}
 */
function arraysAreEqual(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }

  const
    sortedArray1 = array1.toSorted(),
    sortedArray2 = array2.toSorted();

  return !sortedArray1.some((item, index) => item !== sortedArray2[index]);;
}

/**
 * @param {string} expression 
 * @returns {boolean}
 */
function isBalancedParentheses(expression) {
  let parenthesisCount = 0;
  for (const char of expression) {
    switch (char) {
      case '(':
        parenthesisCount++;
        break;
      case ')':
        parenthesisCount--;
        if (parenthesisCount < 0) {
          return false;
        }
        break;
    }
  }

  return parenthesisCount === 0;
}

export class ValidationError extends Error{
  constructor(message){
    super(message);
    this.name='ValidationError';
  }
}

export class IncorrectError extends Error{
  constructor(message,result){
    super(message);
    this.name='IncorrectError';
    this.result=result;
  }
}

const expressions = [];
const operandsPermutations = permutations(['a', 'b', 'c', 'd']);
for (const operators of permutationsWithRepetitions(['+', '-', '*', '/'], 3)) {
  for (const operands of operandsPermutations) {
    expressions.push(`(((${operands[0]} ${operators[0]} ${operands[1]}) ${operators[1]} ${operands[2]}) ${operators[2]} ${operands[3]})`);
    expressions.push(`((${operands[0]} ${operators[0]} (${operands[1]} ${operators[1]} ${operands[2]}) ${operators[2]} ${operands[3]}))`);
    expressions.push(`((${operands[0]} ${operators[0]} ${operands[1]}) ${operators[1]} (${operands[2]} ${operators[2]} ${operands[3]}))`);
    expressions.push(`(${operands[0]} ${operators[0]} ((${operands[1]} ${operators[1]} ${operands[2]}) ${operators[2]} ${operands[3]}))`);
    expressions.push(`(${operands[0]} ${operators[0]} (${operands[1]} ${operators[1]} (${operands[2]} ${operators[2]} ${operands[3]})))`);
  }
}

const isCanMake10 = new Function('a', 'b', 'c', 'd', `${expressions.map(expression =>
  `if (${expression} === 10) {
  return true;}`).join(' ')}
  return false;`);

function permutations(items) {
  const results = [];

  function generate(current, remaining) {
    if (remaining.length === 0) {
      results.push(current);
      return;
    }

    for (let i = 0; i < remaining.length; i++) {
      generate(
        [...current, remaining[i]],
        remaining.filter((_, index) => index != i)
      );
    }
  }

  generate([], items);
  return results;
}

function permutationsWithRepetitions(items, r) {
  const results = [];

  function generate(current) {
    if (current.length === r) {
      results.push(current);
      return;
    }

    for (const item of items) {
      generate([...current, item]);
    }
  }

  generate([]);
  return results;
}