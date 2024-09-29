import {
  generateQuestion,
  IncorrectError ,
  isCorrect,
} from './tenpuzzle.js';

'use strict';

let question;

const
  generateQuestionDiv = document.getElementById('generate-question-div'),
  generateQuestionButton = document.getElementById('generate-question-button'),
  questionDiv = document.getElementById('question-div'),
  questionSpan = document.getElementById('question-numbers-span'),
  answerForm = document.getElementById('answer-form'),
  inCorrectModalResultSpan = document.getElementById('incorrect-modal-result-span'),
  editorPre = document.getElementById('editor-pre');

const
  currentModal = new bootstrap.Modal(document.getElementById('correctModal')),
  incurrentModal = new bootstrap.Modal(document.getElementById('incorrectModal'));

generateQuestionButton.addEventListener('click', () => {
  question = generateQuestion();

  generateQuestionDiv.classList.add('d-none');
  questionDiv.classList.remove('d-none');
  questionSpan.textContent = question.join('');
});

answerForm.addEventListener('submit', event => {
  event.preventDefault();

  const formData = new FormData(event.target);

  const answer = formData.get('answer');

  try {
    if (isCorrect(answer, question)) {
      currentModal.show();
      generateQuestionDiv.classList.remove('d-none');
      questionDiv.classList.add('d-none');
      answerForm.reset();
editorPre.textContent='';
    }
  } catch (error) {
    if (error instanceof IncorrectError) {
      inCorrectModalResultSpan.textContent = `${answer} = ${error.result}`
    }
    incurrentModal.show()
  }
});
