import Note from './Note.js';
import RandomChord from './RandomChord.js';
import KeyboardShortcut from './KeyboardShortcut.js';

const referenceNote = new Note(69);
const bottomNote = 57; //C4=60
const questionSpan = 15; //one octave=12

let currentQuestion;
let answered = true;
let questionType = 1;
let hintSpeed = 0;

export default class UI {
  constructor(els){
    els.playBtn.addEventListener('click', ()=>this.playQuestion());
    els.hintBtn.addEventListener('click', ()=>this.hint());
    els.referenceBtn.addEventListener('click', ()=>this.playReference());
    els.answerBtn.addEventListener('click', ()=>this.showAnswer());
    els.note1Radio.addEventListener('click', ()=>this.setQuestionType(1));
    els.note2Radio.addEventListener('click', ()=>this.setQuestionType(2));
    els.note3Radio.addEventListener('click', ()=>this.setQuestionType(3));
    els.note4Radio.addEventListener('click', ()=>this.setQuestionType(4));

    this.playBtn = els.playBtn;
    this.answerDiv = els.answerDiv;

    new KeyboardShortcut('r', ()=>this.playQuestion());
    new KeyboardShortcut('a', ()=>this.playReference());
    new KeyboardShortcut('h', ()=>this.hint());
    new KeyboardShortcut(' ', ()=>this.showAnswer());
  }

  showMsg(msg){
    this.answerDiv.innerHTML = msg;
  }

  playReference(){
    referenceNote.play();
  }

  playQuestion(){
    if(!answered){
      this.repeatLastQuestion();
      return;
    }
    answered = false;

    referenceNote.stop();
    hintSpeed = 0;

    if(questionType === 1){
      currentQuestion = new Note(bottomNote + Math.floor(Math.random() * questionSpan));
    }else{
      currentQuestion = new RandomChord(bottomNote, questionSpan, questionType);
    }

    currentQuestion.play();
    this.showMsg('');
    this.playBtn.innerHTML = 'Repeat';
  }

  repeatLastQuestion(noteDistance){
    if(!currentQuestion){
      this.showMsg('Play something first');
      return;
    }
    currentQuestion.play(noteDistance);
  }

  hint(){
    hintSpeed++;
    //slow down the playing each time the hint button is pressed
    this.repeatLastQuestion(hintSpeed * 0.15);
    //reset to original speed
    if(hintSpeed > 2) hintSpeed = 0;
  }

  showAnswer(){
    if(!currentQuestion){
      this.showMsg('Play something first');
      return;
    }
    if(answered){
      this.repeatLastQuestion();
    }
    answered = true;
    this.showMsg(currentQuestion.name);
    this.playBtn.innerHTML = 'Play New';
  }

  setQuestionType(type){
    questionType = type;
  }
}
