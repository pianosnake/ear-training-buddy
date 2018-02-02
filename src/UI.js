import Note from './Note.js';
import RandomChord from './RandomChord.js';
import RandomInterval from './RandomInterval.js';
import KeyboardShortcut from './KeyboardShortcut.js';

const referenceNote = new Note(69);
const bottomNote = 60; //C4
const chordSpan = 12; //one octave of questions

let currentQuestion;
let answered = true;
let questionType = 'chord';
let hintSpeed = 0;

export default class UI {
  constructor(els){
    els.playBtn.addEventListener('click', ()=>this.playQuestion());
    els.hintBtn.addEventListener('click', ()=>this.hint());
    els.referenceBtn.addEventListener('click', ()=>this.playReference());
    els.answerBtn.addEventListener('click', ()=>this.showAnswer());
    els.chordRadio.addEventListener('click', ()=>this.setQuestionType('chord'));
    els.intervalRadio.addEventListener('click', ()=>this.setQuestionType('interval'));

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

    if(questionType === 'chord'){
      currentQuestion = new RandomChord(bottomNote, chordSpan);
    }else{
      currentQuestion = new RandomInterval(bottomNote, chordSpan);
    }

    currentQuestion.play();
    this.showMsg('');
    this.playBtn.innerHTML = 'Repeat';
  }

  repeatLastQuestion(noteDistance){
    if(!currentQuestion){
      this.showMsg('Play a chord first');
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
    answered = true;
    this.answerDiv.innerHTML = currentQuestion.name;
    this.playBtn.innerHTML = 'Play New';
    this.repeatLastQuestion();
  }

  setQuestionType(type){
    questionType = type;
  }
}
