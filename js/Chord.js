import Playable from './Playable.js';
import { Note } from './Note.js';
import { chordTypes, pickRandom } from './definitions.js';

const voicings = [-12, 0, 0, -12];  //play the root and 7th an octave below to get a fuller piano sound

export class Chord extends Playable {
  constructor(referenceNoteValue, type, notes, voiced) {
    super();

    this.notes = notes.map((distanceFromRoot, index) => {
      const voicedOffset = (voiced && notes.length > 2) ? voicings[index] : 0; //don't voice intervals
      return new Note(referenceNoteValue + distanceFromRoot + voicedOffset);
    });
    this.type = type;
  }

  get name() {
    if (this.notes.length === 2) {
      return `${this.type} (${this.notes[0].name} - ${this.notes[1].name})`;
    } else {
      return this.notes[0].name + ' ' + this.type;
    }
  }
}

export function randomChord(bottomNote, chordSpan, noteCount, voiced) {
  const root = bottomNote + Math.floor(Math.random() * chordSpan);
  const chord = pickRandom(chordTypes['chromatic'][noteCount]);

  return new Chord(root, chord.type, chord.def, voiced);
}

export function randomPivotChord(pivotNoteValue, noteCount, voiced) {
  const chord = pickRandom(chordTypes['chromatic'][noteCount]);
  const pivotOffset = pickRandom(chord.def);

  return new Chord(pivotNoteValue + chord.def[0] - pivotOffset, chord.type, chord.def, voiced);
}

export function randomDiatonicChord(referenceNoteValue, noteCount, voiced) {
  const octaveOffset = Math.round(Math.random()) * 12; //randomly lower by 1 octave
  const chord = pickRandom(chordTypes['diatonic'][noteCount]);

  return new Chord(referenceNoteValue - octaveOffset, chord.type, chord.def, voiced);
}