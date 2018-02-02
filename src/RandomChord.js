import Playable from './Playable.js';
import Note from './Note.js';

const chordTypes = [
  //definition is an array of semitones from root
  {type: 'major', def: [0, 4, 7]},
  {type: 'minor', def: [0, 3, 7]},
  {type: 'diminished', def: [0, 3, 6]},
  {type: 'augmented', def: [0, 4, 8]},
  {type: 'dominant', def: [0, 4, 7, 10]},
  {type: 'major 7th', def: [0, 4, 7, 11]},
  {type: 'minor 7th', def: [0, 3, 7, 10]},
  {type: 'half-diminished 7th', def: [0, 3, 6, 10]}
]

export default class RandomChord extends Playable {
  constructor(bottomNote, chordSpan){
    super();

    const chord = chordTypes[Math.floor(Math.random() * chordTypes.length)];
    const root = bottomNote + Math.floor(Math.random() * chordSpan);

    this.notes = chord.def.map(distanceFromRoot => new Note(root + distanceFromRoot));

    this.name = this.notes[0].name.slice(0, -1) + ' ' + chord.type; //slice off the number from the note name
  }
}
