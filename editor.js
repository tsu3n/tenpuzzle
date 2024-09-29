import {
  NUMBER,
  ADDITION,
  SUBTRACTION,
  MULTIPLICATION,
  DIVISION,
  LEFT_PARENTHESIS,
  RIGHT_PARENTHESIS,
  ILLEGAL,
  scanAll
} from './token.js'

'use strict';

/**
 * ハイライトする
 * @param {string} text
 * @returns {HTMLElement}
 */
function highlight(text) {
  const tokens = scanAll(text);

  const code = document.createElement('code');

  let errorText = '';
  for (let index = 0; index < tokens.length; index++) {
    const token = tokens[index];

    const span = document.createElement('span');
    let isError = false;
    switch (token.type) {
      case NUMBER:
        if (tokens[index - 1]?.type === NUMBER) {
          isError = true;
          break;
        }

        if (token.value === '0'
          && tokens[index - 1]?.type === DIVISION) {
          isError = true;
          break;
        }

        span.classList.add('number');

        break;
      case ADDITION:
      case SUBTRACTION:
      case MULTIPLICATION:
      case DIVISION:
        if (tokens[index - 1]?.type === ADDITION ||
          tokens[index - 1]?.type === SUBTRACTION ||
          tokens[index - 1]?.type === MULTIPLICATION ||
          tokens[index - 1]?.type === DIVISION) {
          isError = true;
          break;
        }

        break;
      case LEFT_PARENTHESIS:
      case RIGHT_PARENTHESIS:
        break;
      case ILLEGAL:
        isError = true;
        break;
    }

    if (isError) {
      errorText += token.value;
    } else {
      if (errorText) {
        const errorSpan = document.createElement('span');
        errorSpan.classList.add('error');
        errorSpan.textContent = errorText;
        code.appendChild(errorSpan);
        errorText = '';
      }
      span.textContent = token.value;
      code.appendChild(span)
    }
  }

  if (errorText) {
    const errorSpan = document.createElement('span');
    errorSpan.classList.add('error');
    errorSpan.textContent = errorText;
    code.appendChild(errorSpan);

  }

  return code;
}

const
  editorInput = document.getElementById('editor-input'),
  editorPre = document.getElementById('editor-pre');

editorInput.addEventListener('input', () => {
  editorPre.innerHTML = ''
  editorPre.appendChild(highlight(editorInput.value))
})
