import Note from './Note.js';
import RandomChord from './RandomChord.js';
import RandomInterval from './RandomInterval.js';
import KeyboardShortcut from './KeyboardShortcut.js';

const answerDiv = document.getElementById('answer');
const playBtn = document.getElementById('playBtn');

const referenceNote = new Note(69);

const bottomNote = 60; //C4
const chordSpan = 12; //one octave of questions
let currentQuestion;
let answered = true;
let questionType = 'chord';

function msg(msg){
  answerDiv.innerHTML = msg;
}

function playReference(){
  referenceNote.play();
}

function playQuestion(){
  if(!answered){
    repeatLastQuestion();
    return;
  }
  answered = false;

  referenceNote.stop();
  if(questionType === 'chord'){
    currentQuestion = new RandomChord(bottomNote, chordSpan);
  }else{
    currentQuestion = new RandomInterval(bottomNote, chordSpan);
  }

  currentQuestion.play();
  msg('');
  playBtn.innerHTML = 'Repeat';
}

function repeatLastQuestion(melodic){
  if(!currentQuestion){
    msg('Play a chord first');
    return;
  }
  currentQuestion.play(melodic);
}

function hint(){
  repeatLastQuestion(true);
}

function reveal(){
  if(!currentQuestion){
    msg('Play first');
    return;
  }
  answered = true;
  answerDiv.innerHTML = currentQuestion.name;
  playBtn.innerHTML = 'Play New';
}

function setQuestionType(type){
  questionType = type;
}

new KeyboardShortcut('r', playQuestion);
new KeyboardShortcut('a', playReference);
new KeyboardShortcut('h', hint);
new KeyboardShortcut(' ', reveal);