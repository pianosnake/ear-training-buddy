import Playable from './Playable.js';
import {Note, RandomDiatonicNote} from './Note.js';
import {chordTypes, pickRandom} from './definitions.js';

const voicings = [-12, 0, 0, -12];  //play the root and 7th an octave below to get a fuller piano sound

class Chord extends Playable{
  constructor(noteCount, diatonic){
    super();

    const type = diatonic || 'chromatic';
    this.chord = pickRandom(chordTypes[type][noteCount]);
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
  constructor(bottomNote, chordSpan, noteCount, voiced){
    super(noteCount);

    const root = bottomNote + Math.floor(Math.random() * chordSpan);

    this.notes = this.chord.def
      .map((distanceFromRoot, index) => {
        const voicedOffset = (voiced && noteCount > 2) ? voicings[index]: 0;  //don't voice intervals
        return new Note(root + distanceFromRoot + voicedOffset)
    });
  }
}

export class PivotChord extends Chord{
   constructor(pivot, noteCount, voiced){
    super(noteCount);

    const pivotOffset = pickRandom(this.chord.def);

    this.notes = this.chord.def
     .map(v => v - pivotOffset) //subtract pivot from each note to place the chord around the pivot
     .map((distanceFromPivot, index) => {
       const voicedOffset = (voiced && noteCount > 2) ? voicings[index]: 0;  //don't voice intervals
       return new Note(pivot.value + distanceFromPivot + voicedOffset)
     });
  }
}

export class DiatonicInterval extends Chord{
  constructor(referenceNote){
    super(2);

    const note1 = new RandomDiatonicNote(referenceNote);
    let note2 = new RandomDiatonicNote(referenceNote);

    //find a second note that's not the same as first and that's not more than an octave away
    while(note2.value === note1.value || Math.abs(note2.value - note1.value) > 12){
      note2 = new RandomDiatonicNote(referenceNote);
    }

    this.notes = [note1, note2];

    const diff = Math.abs(note1.value - note2.value);
    this.chord = chordTypes['chromatic'][2].find(c => c.def[1] === diff);
  }
}

export class DiatonicChord extends Chord{
  constructor(referenceNote, noteCount, voiced){
    super(noteCount, 'diatonic');

    const octaveOffset = Math.round(Math.random()) * 12; //randomly lower by 1 octave

    this.notes = this.chord.def
      .map((distanceFromRoot, index) => {
        const voicedOffset = (voiced && noteCount > 2) ? voicings[index]: 0;  //don't voice intervals
        return new Note(referenceNote.value + distanceFromRoot + voicedOffset - octaveOffset);
    });
  }
}