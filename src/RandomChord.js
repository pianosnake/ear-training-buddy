import Playable from './Playable.js';
import Note from './Note.js';
import {chordTypes} from './chordTypes.js';

export default class RandomChord extends Playable {
  constructor(bottomNote, chordSpan, numberOfNotes){
    super();

    const typesLength =  chordTypes[numberOfNotes].length;
    const root = bottomNote + Math.floor(Math.random() * chordSpan);

    this.chordType = chordTypes[numberOfNotes][Math.floor(Math.random() * typesLength)];
    this.notes = this.chordType.def.map(distanceFromRoot => new Note(root + distanceFromRoot));
  }

  get name(){
    if(this.notes.length === 2){
      return `${this.chordType.type} (${this.notes[0].name} - ${this.notes[1].name})`;
    }else{
      return this.notes[0].name + ' ' + this.chordType.type;
    }
  }
}
