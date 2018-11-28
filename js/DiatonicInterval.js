import Playable from './Playable.js';
import { randomDiatonicNote } from './Note.js';
import { chordTypes } from './definitions.js';

export class DiatonicInterval extends Playable {
  constructor(type, notes) {
    super();

    this.type = type;
    this.notes = notes;
  }
  get name() {
    return `${this.type} (${this.notes[0].name} - ${this.notes[1].name})`;
  }
}

export function randomDiatonicInterval(referenceNote) {
  const note1 = randomDiatonicNote(referenceNote);
  let note2 = randomDiatonicNote(referenceNote);

  //find a second note that's not the same as first and that's not more than an octave away
  while (note2.value === note1.value || Math.abs(note2.value - note1.value) > 12) {
    note2 = randomDiatonicNote(referenceNote);
  }

  const diff = Math.abs(note1.value - note2.value);
  const def = chordTypes['chromatic'][2].find(c => c.def[1] === diff);

  return new DiatonicInterval(def.type, [note1, note2]);
}
