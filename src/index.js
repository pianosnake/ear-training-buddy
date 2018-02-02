import UI from './UI.js';

new UI({
  answerDiv: document.getElementById('answer'),
  playBtn: document.getElementById('playBtn'),
  hintBtn: document.getElementById('hintBtn'),
  answerBtn: document.getElementById('answerBtn'),
  referenceBtn: document.getElementById('referenceBtn'),
  chordRadio: document.getElementById('chordRadio'),
  intervalRadio: document.getElementById('intervalRadio')
})