import Playable from './Playable.js';
import Note from './Note.js';
import {chordTypes} from './chordTypes.js';

const voicings = [-12, 0, 0, -12];  //play the root and 7th an octave below to get a fuller piano sound

class Chord extends Playable{
  constructor(){
    super();
  }

  get name(){
    if(this.notes.length === 2){
      return `${this.chord.type} (${this.notes[0].name} - ${this.notes[1].name})`;
    }else{
      return this.notes[0].name + ' ' + this.chord.type;
    }
  }
}

export class RandomChord extends Chord {
  constructor(bottomNote, chordSpan, numberOfNotes, voiced){
    super();

    const typesLength =  chordTypes[numberOfNotes].length;
    const root = bottomNote + Math.floor(Math.random() * chordSpan);

    this.chord = chordTypes[numberOfNotes][Math.floor(Math.random() * typesLength)];
    this.notes = this.chord.def
      .map((distanceFromRoot, index) => {
        const voicedOffset = (voiced && numberOfNotes > 2) ? voicings[index]: 0;  //don't voice intervals
        return new Note(root + distanceFromRoot + voicedOffset)
    });
  }
}

export class PivotChord extends Chord{
   constructor(pivot, numberOfNotes, voiced){
    super();

    this.pivot = pivot;

    const typesLength =  chordTypes[numberOfNotes].length;
    this.chord = chordTypes[numberOfNotes][Math.floor(Math.random() * typesLength)];

    const pivotOffset = this.chord.def[Math.floor(Math.random() * this.chord.def.length)];

    this.notes = this.chord.def
     .map(v => v - pivotOffset) //subtract pivot from each note to place the chord around the pivot
     .map((distanceFromRoot, index) => {
       const voicedOffset = (voiced && numberOfNotes > 2) ? voicings[index]: 0;  //don't voice intervals
       return new Note(pivot.value + distanceFromRoot + voicedOffset)
     });
  }

  get distance(){
    const diff = Math.abs(this.pivot.value - this.notes[0].value) % 12;
    //get the name of the interval that has the same distance as the pivot to the root note of this chord
    //so we can create messages like: 'A is the Major Third of F Major'
    return chordTypes[2].find(x=> x.def[1] === diff).type;
  }
}