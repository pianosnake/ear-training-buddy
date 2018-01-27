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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Wave_js__ = __webpack_require__(3);


const noteNames = ['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B'];

function noteNameFromMIDINumber(num){
  const octave = Math.floor(num / 12) - 1;
  const idx = num % 12;
  return noteNames[idx] + octave;
}

class Note{
  constructor(MIDINumber){
    this.value = MIDINumber;
    this.name = noteNameFromMIDINumber(MIDINumber);
    this.file = 'sounds/' + this.name + '-97-127.mp3';
    this.sound;
  }

  play(){
    this.sound = new __WEBPACK_IMPORTED_MODULE_0__Wave_js__["a" /* default */](this.file);
    this.sound.start();
  }
  stop(){
    if(this.sound) this.sound.stop();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Note);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Playable {
    constructor(){
      this.melodicPlaybackNoteDistance = 200;
    }
   play(melodic){
    if(melodic){
      this.notes.forEach((note, index) =>
          setTimeout(() =>{
            note.play();
          }, index * this.melodicPlaybackNoteDistance)
      );
    }else{
      this.notes.forEach(note=>note.play());
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Playable);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Note_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__RandomChord_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__RandomInterval_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__KeyboardShortcut_js__ = __webpack_require__(6);





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
    msg('Play first');
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
class Wave {
  constructor(file){
    this.file = file;

    if(!window.audioContext) {
      window.audioContext = new (window.AudioContext || window.webkitAudioContext)();  //Safari needs the webkitAudioContext part
    }
    this.audioContext = window.audioContext;
    this.gainNode = this.audioContext.createGain();
  }

  start(){
    this.source = this.audioContext.createBufferSource();
    const request = new XMLHttpRequest();
    request.open('GET', this.file, true);
    request.responseType = 'arraybuffer';

    request.onload = () => {
      this.audioContext.decodeAudioData(request.response, decodedData =>{ //use a callback bc Safari 11.0.2 doesn't support promises here
        this.source.buffer = decodedData;

        this.source.connect(this.gainNode);
        this.gainNode.connect(this.audioContext.destination);
        this.gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 3); //fade out

        this.source.start(0, 0, 3); //same as fadeout
      });
    };

    request.send();
  }
  stop(){
    if(!this.source) return;
    this.source.stop();
    this.source.disconnect();
    this.source = null;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Wave);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Playable_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Note_js__ = __webpack_require__(0);



class RandomChord extends __WEBPACK_IMPORTED_MODULE_0__Playable_js__["a" /* default */] {
  constructor(bottomNote, chordSpan){
    super();

    const root = new __WEBPACK_IMPORTED_MODULE_1__Note_js__["a" /* default */](bottomNote + Math.floor(Math.random() * chordSpan));
    const major = Math.round(Math.random()); // a 1 or 0 for major
    const third = new __WEBPACK_IMPORTED_MODULE_1__Note_js__["a" /* default */](root.value + 3 + major);  //generate a minor or major third randomly
    const fifth = new __WEBPACK_IMPORTED_MODULE_1__Note_js__["a" /* default */](root.value + 7);

    this.notes = [root, third, fifth].sort((n1, n2)=> n1.value > n2.value);  //sort in case of inversions
    this.name = root.name.slice(0, -1) + ' ' + (major ? 'Major' : 'minor'); //slice off the number from the note name
  }
}

/* harmony default export */ __webpack_exports__["a"] = (RandomChord);

/***/ }),
/* 5 */
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
    this.melodicPlaybackNoteDistance = 800;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (RandomInterval);

/***/ }),
/* 6 */
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