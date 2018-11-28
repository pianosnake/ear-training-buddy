import { Note, randomNote, randomDiatonicNote } from './Note.js';
import { randomChord, randomPivotChord, randomDiatonicChord } from './Chord.js';
import { randomDiatonicInterval } from './DiatonicInterval.js';
import KeyboardShortcut from './KeyboardShortcut.js';

const bottomNoteValue = 57; //C4=60
const questionSpan = 15; //one octave=12

let currentQuestion;
let answered = true;
let numberOfNotesToPlay = 1;
let hintSpeed = 0;
let pivot = false;
let voiced = false;
let diatonic = false;

export default class App {
  constructor(els) {
    els.playBtn.addEventListener('click', () => this.playQuestion());
    els.hintBtn.addEventListener('click', () => this.hint());
    els.referenceBtn.addEventListener('click', () => this.playReference());
    els.refNoteSelect.addEventListener('change', () => this.changeReference());
    els.refNoteSelect.addEventListener('click', e => e.stopPropagation());
    els.answerBtn.addEventListener('click', () => this.showAnswer());

    els.note1Radio.addEventListener('click', () => this.setNumberOfNotesToPlay(1));
    els.note2Radio.addEventListener('click', () => this.setNumberOfNotesToPlay(2));
    els.note3Radio.addEventListener('click', () => this.setNumberOfNotesToPlay(3));
    els.note4Radio.addEventListener('click', () => this.setNumberOfNotesToPlay(4));

    els.pivotChk.addEventListener('click', () => this.setPivot());
    els.voicedChk.addEventListener('click', () => this.setVoiced());
    els.diatonicChk.addEventListener('click', () => this.setDiatonic());

    this.diatonicChk = els.diatonicChk;
    this.pivotChk = els.pivotChk;
    this.playBtn = els.playBtn;
    this.answerDiv = els.answerDiv;
    this.refNoteSelect = els.refNoteSelect;
    this.refNoteLabel = els.refNoteLabel;
    this.referenceNote = new Note(this.refNoteSelect.value);

    new KeyboardShortcut('r', () => this.playQuestion());
    new KeyboardShortcut('a', () => this.playReference());
    new KeyboardShortcut('h', () => this.hint());
    new KeyboardShortcut(' ', () => this.showAnswer());
  }

  showMsg(msg) {
    this.answerDiv.innerHTML = msg;
  }

  playReference() {
    this.referenceNote.play();
  }

  changeReference() {
    this.referenceNote = new Note(this.refNoteSelect.value);
    this.refNoteLabel.innerText = this.referenceNote.name;
  }

  playQuestion() {
    if (!answered) {
      this.repeatLastQuestion();
      return;
    }
    answered = false;
    this.referenceNote.stop();

    if (numberOfNotesToPlay === 1) {
      if (diatonic) {
        currentQuestion = randomDiatonicNote(this.referenceNote.value);
      } else {
        currentQuestion = randomNote(bottomNoteValue, questionSpan);
      }
    } else {
      if (diatonic) {
        if (numberOfNotesToPlay === 2) {
          currentQuestion = randomDiatonicInterval(this.referenceNote.value);
        } else if (numberOfNotesToPlay > 2) {
          currentQuestion = randomDiatonicChord(this.referenceNote.value, numberOfNotesToPlay, voiced);
        }
      } else if (pivot) {
        currentQuestion = randomPivotChord(this.referenceNote.value, numberOfNotesToPlay, voiced);
      } else {
        currentQuestion = randomChord(bottomNoteValue, questionSpan, numberOfNotesToPlay, voiced);
      }
    }

    currentQuestion.play();
    this.showMsg('');
    this.playBtn.innerHTML = 'Repeat';
  }

  repeatLastQuestion(noteDistance) {
    if (!currentQuestion) {
      this.showMsg('Play something first');
      return;
    }
    currentQuestion.play(noteDistance);
  }

  hint() {
    hintSpeed++;
    //slow down the playing each time the hint button is pressed
    this.repeatLastQuestion(hintSpeed * 0.15);
    //reset to original speed
    if (hintSpeed > 3) hintSpeed = 0;
  }

  showAnswer() {
    if (!currentQuestion) {
      this.showMsg('Play something first');
      return;
    }
    this.repeatLastQuestion();
    this.showMsg(currentQuestion.name);
    this.reset();
  }

  setNumberOfNotesToPlay(type) {
    numberOfNotesToPlay = type;
    this.reset();
  }

  setPivot() {
    pivot = !pivot;
    diatonic = false;
    this.diatonicChk.checked = false;
    this.reset();
  }

  setVoiced() {
    voiced = !voiced;
    this.reset();
  }

  setDiatonic() {
    diatonic = !diatonic;
    pivot = false;
    this.pivotChk.checked = false;
    this.reset();
  }

  reset() {
    this.playBtn.innerHTML = 'New';
    hintSpeed = 0;
    answered = true;
  }
}
