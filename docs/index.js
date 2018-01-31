/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Playable_js__ = __webpack_require__(1);


const noteNames = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

function noteNameFromMIDINumber(num){
  const octave = Math.floor(num / 12) - 1;
  const idx = num % 12;
  return noteNames[idx] + octave;
}

class Note extends __WEBPACK_IMPORTED_MODULE_0__Playable_js__["a" /* default */] {
  constructor(MIDINumber){
    super();

    this.value = MIDINumber;
    this.name = noteNameFromMIDINumber(MIDINumber);
    this.file = './sounds/' + this.name + '-97-127.mp3';
    this.notes = [this];
    this.buffer;
  }

  getAudio(audioContext){
    return new Promise((resolve, reject) =>{
      if(this.buffer){
        resolve(this.buffer);
        return;
      }

      const request = new XMLHttpRequest();
      request.open('GET', this.file, true);
      request.responseType = 'arraybuffer';

      request.onload = () => {
        audioContext.decodeAudioData(request.response, decodedData => {
          this.buffer = decodedData;
          resolve(this.buffer);
        });
      }

      request.onerror = err => reject(err);

      request.send();
    })

  }
}

/* harmony default export */ __webpack_exports__["a"] = (Note);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Playable {
  constructor(){
    if(!window.audioContext) {
      window.audioContext = new (window.AudioContext || window.webkitAudioContext)();  //Safari needs the webkitAudioContext part
    }
    this.audioContext = window.audioContext;
    this.compressor = this.audioContext.createDynamicsCompressor();

    this.gainNode = this.audioContext.createGain();
    this.gainNode.connect(this.compressor);
    this.compressor.connect(this.audioContext.destination);

    this.melodicDelay = 0.2;
  }

  play(melodic){
    this.gainNode.gain.setValueAtTime(1, this.audioContext.currentTime);

    Promise.all(this.notes.map(note =>{
      return note.getAudio(this.audioContext)
    }))
      .then(() =>{
        this.notes.forEach((note, index) =>{
          const source = audioContext.createBufferSource();
          const offset = melodic ? index * this.melodicDelay : 0;

          source.buffer = note.buffer;
          source.connect(this.gainNode);
          source.start(this.audioContext.currentTime + offset, 0, 3); //end around the same time as the fadeout
        })
        this.gainNode.gain.setTargetAtTime(0, this.audioContext.currentTime + 1, 0.5); //fade out
      })
  }

  stop(){
      this.gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Playable);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Note_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__RandomChord_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__RandomInterval_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__KeyboardShortcut_js__ = __webpack_require__(5);





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

const referenceNote = new __WEBPACK_IMPORTED_MODULE_0__Note_js__["a" /* default */](69);
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
    currentQuestion = new __WEBPACK_IMPORTED_MODULE_1__RandomChord_js__["a" /* default */](bottomNote, chordSpan);
  }else{
    currentQuestion = new __WEBPACK_IMPORTED_MODULE_2__RandomInterval_js__["a" /* default */](bottomNote, chordSpan);
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

new __WEBPACK_IMPORTED_MODULE_3__KeyboardShortcut_js__["a" /* default */]('r', playQuestion);
new __WEBPACK_IMPORTED_MODULE_3__KeyboardShortcut_js__["a" /* default */]('a', playReference);
new __WEBPACK_IMPORTED_MODULE_3__KeyboardShortcut_js__["a" /* default */]('h', hint);
new __WEBPACK_IMPORTED_MODULE_3__KeyboardShortcut_js__["a" /* default */](' ', answer);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Playable_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Note_js__ = __webpack_require__(0);



const chordTypes = [
  //definition is an array of semitones from root
  {type: 'major', def: [0, 4, 7]},
  {type: 'minor', def: [0, 3, 7]},
  {type: 'diminished', def: [0, 3, 6]},
  {type: 'augmented', def: [0, 4, 8]},
  {type: 'dominant', def: [0, 4, 7, 10]},
  {type: 'major 7th', def: [0, 4, 7, 11]},
  {type: 'minor 7th', def: [0, 3, 7, 10]},
  {type: 'half-diminisehd 7th', def: [0, 3, 6, 10]}
]

class RandomChord extends __WEBPACK_IMPORTED_MODULE_0__Playable_js__["a" /* default */] {
  constructor(bottomNote, chordSpan){
    super();

    const chord = chordTypes[Math.floor(Math.random() * chordTypes.length)];
    const root = bottomNote + Math.floor(Math.random() * chordSpan);

    this.notes = chord.def.map(distanceFromRoot => {
      return new __WEBPACK_IMPORTED_MODULE_1__Note_js__["a" /* default */](root + distanceFromRoot)
    })

    this.name = this.notes[0].name.slice(0, -1) + ' ' + chord.type; //slice off the number from the note name
  }
}

/* harmony default export */ __webpack_exports__["a"] = (RandomChord);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Playable_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Note_js__ = __webpack_require__(0);



const intervalNames = ['Unison', 'Minor second', 'Major second', 'Minor third', 'Major third', 'Fourth', 'Tritone', 'Fifth', 'Minor sixth', 'Major sixth', 'Minor seventh', 'Major seventh', 'Octave'];

class RandomInterval extends __WEBPACK_IMPORTED_MODULE_0__Playable_js__["a" /* default */] {
  constructor(bottomNote, range){
    super();

    const first = new __WEBPACK_IMPORTED_MODULE_1__Note_js__["a" /* default */](bottomNote + Math.floor(Math.random() * range));
    const second = new __WEBPACK_IMPORTED_MODULE_1__Note_js__["a" /* default */](first.value + 1 + Math.floor(Math.random() * 11)); //don't play unisons

    this.notes = [first, second];
    this.name = `${intervalNames[second.value - first.value]} (${first.name}-${second.name})`;
    this.melodicDelay = 0.3;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (RandomInterval);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class KeyboardShortcut {
  constructor(listenFor, callback){

    const existingListener = window.onkeyup;

    window.onkeyup = function(e){

      if(existingListener){
        existingListener(e);
      }

      if(e.key === listenFor){
        callback();
      }
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (KeyboardShortcut);

/***/ })
/******/ ]);