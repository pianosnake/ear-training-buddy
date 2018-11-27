import UI from './UI.js';

new UI({
  answerDiv: document.getElementById('answer'),
  playBtn: document.getElementById('playBtn'),
  hintBtn: document.getElementById('hintBtn'),
  answerBtn: document.getElementById('answerBtn'),
  referenceBtn: document.getElementById('referenceBtn'),
  refNoteSelect: document.getElementById('refNoteSelect'),
  refNoteLabel: document.getElementById('refNoteLabel'),

  note1Radio: document.getElementById('note1'),
  note2Radio: document.getElementById('note2'),
  note3Radio: document.getElementById('note3'),
  note4Radio: document.getElementById('note4'),

  pivotChk: document.getElementById('pivotChk'),
  voicedChk: document.getElementById('voicedChk'),
  diatonicChk: document.getElementById('diatonicChk')
})