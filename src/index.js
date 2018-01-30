import Note from './Note.js';
import RandomChord from './RandomChord.js';
import RandomInterval from './RandomInterval.js';
import KeyboardShortcut from './KeyboardShortcut.js';

const answerDiv = document.getElementById('answer');
const playBtn = document.getElementById('playBtn');
const hintBtn = document.getElementById('hintBtn');
const answerBtn = document.getElementById('answerBtn');
const referenceBtn = document.getElementById('referenceBtn');
const chordRadio = document.getElementById('chordRadio');
const intervalRadio = document.getElementById('intervalRadio');

playBtn.addEventListener('click', playQuestion);
hintBtn.addEventListener('click', hint);
referenceBtn.addEventListener('click', playReference);
answerBtn.addEventListener('click', answer);
chordRadio.addEventListener('click', ()=>setQuestionType('chord'));
intervalRadio.addEventListener('click', ()=>setQuestionType('interval'));

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

function answer(){
  if(!currentQuestion){
    msg('Play something first');
    return;
  }
  answered = true;
  answerDiv.innerHTML = currentQuestion.name;
  playBtn.innerHTML = 'Play New';
  repeatLastQuestion();
}

function setQuestionType(type){
  questionType = type;
}

new KeyboardShortcut('r', playQuestion);
new KeyboardShortcut('a', playReference);
new KeyboardShortcut('h', hint);
new KeyboardShortcut(' ', answer);