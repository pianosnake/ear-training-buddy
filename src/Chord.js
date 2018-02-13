import Playable from './Playable.js';
import {Note} from './Note.js';
import {chordTypes} from './chordTypes.js';

const voicings = [-12, 0, 0, -12];  //play the root and 7th an octave below to get a fuller piano sound

class Chord extends Playable{
  constructor(numberOfNotes){
    super();

    const typesLength =  chordTypes[numberOfNotes].length;
    this.chord = chordTypes[numberOfNotes][Math.floor(Math.random() * typesLength)];
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
    super(numberOfNotes);

    const root = bottomNote + Math.floor(Math.random() * chordSpan);

    this.notes = this.chord.def
      .map((distanceFromRoot, index) => {
        const voicedOffset = (voiced && numberOfNotes > 2) ? voicings[index]: 0;  //don't voice intervals
        return new Note(root + distanceFromRoot + voicedOffset)
    });
  }
}

export class PivotChord extends Chord{
   constructor(pivot, numberOfNotes, voiced){
    super(numberOfNotes);

    const pivotOffset = this.chord.def[Math.floor(Math.random() * this.chord.def.length)];

    this.notes = this.chord.def
     .map(v => v - pivotOffset) //subtract pivot from each note to place the chord around the pivot
     .map((distanceFromPivot, index) => {
       const voicedOffset = (voiced && numberOfNotes > 2) ? voicings[index]: 0;  //don't voice intervals
       return new Note(pivot.value + distanceFromPivot + voicedOffset)
     });
  }
}