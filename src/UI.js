import {Note, RandomNote, RandomDiatonicNote} from './Note.js';
import {RandomChord, PivotChord, DiatonicInterval, DiatonicChord} from './Chord.js';
import KeyboardShortcut from './KeyboardShortcut.js';

const referenceNote = new Note(69);
const bottomNote = 57; //C4=60
const questionSpan = 15; //one octave=12

let currentQuestion;
let answered = true;
let numberOfNotesToPlay = 1;
let hintSpeed = 0;
let pivot = false;
let voiced = false;
let diatonic = false;

export default class UI {
  constructor(els){
    els.playBtn.addEventListener('click', ()=>this.playQuestion());
    els.hintBtn.addEventListener('click', ()=>this.hint());
    els.referenceBtn.addEventListener('click', ()=>this.playReference());
    els.answerBtn.addEventListener('click', ()=>this.showAnswer());

    els.note1Radio.addEventListener('click', ()=>this.setNumberOfNotesToPlay(1));
    els.note2Radio.addEventListener('click', ()=>this.setNumberOfNotesToPlay(2));
    els.note3Radio.addEventListener('click', ()=>this.setNumberOfNotesToPlay(3));
    els.note4Radio.addEventListener('click', ()=>this.setNumberOfNotesToPlay(4));

    els.pivotChk.addEventListener('click', ()=>this.setPivot());
    els.voicedChk.addEventListener('click', ()=>this.setVoiced());
    els.diatonicChk.addEventListener('click', ()=>this.setDiatonic());

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

    if(numberOfNotesToPlay === 1){
      if(diatonic){
        currentQuestion = new RandomDiatonicNote(referenceNote);
      }else{
        currentQuestion = new RandomNote(bottomNote, questionSpan);
      }
    }else{
      if(diatonic && numberOfNotesToPlay === 2){
        currentQuestion = new DiatonicInterval(referenceNote);
      }
       else if(diatonic && numberOfNotesToPlay > 2){
        currentQuestion = new DiatonicChord(referenceNote, numberOfNotesToPlay, voiced);
      }
      else if(pivot){
        currentQuestion = new PivotChord(referenceNote, numberOfNotesToPlay, voiced);
      }else{
        currentQuestion = new RandomChord(bottomNote, questionSpan, numberOfNotesToPlay, voiced);
      }
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
    if(hintSpeed > 3) hintSpeed = 0;
  }

  showAnswer(){
    if(!currentQuestion){
      this.showMsg('Play something first');
      return;
    }
    this.repeatLastQuestion();
    this.showMsg(currentQuestion.name);
    this.reset();
  }

  setNumberOfNotesToPlay(type){
    numberOfNotesToPlay = type;
    this.reset();
  }

  setPivot(){
    pivot = !pivot;
    this.reset();
  }

  setVoiced(){
    voiced = !voiced;
    this.reset();
  }

  setDiatonic(){
    diatonic = !diatonic;
    this.reset();
  }

  reset(){
    this.playBtn.innerHTML = 'New';
    answered = true;
  }
}
