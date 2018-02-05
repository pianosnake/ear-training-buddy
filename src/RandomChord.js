import Playable from './Playable.js';
import Note from './Note.js';

const chordTypes = [
  //definition is an array of semitones from root
  {type: 'Minor second', def: [0, 1]},
  {type: 'Major second', def: [0, 2]},
  {type: 'Minor third', def: [0, 3]},
  {type: 'Major third', def: [0, 4]},
  {type: 'Fourth', def: [0, 5]},
  {type: 'Tritone', def: [0, 6]},
  {type: 'Fifth', def: [0, 7]},
  {type: 'Minor sixth', def: [0, 8]},
  {type: 'Major sixth', def: [0, 9]},
  {type: 'Minor seventh', def: [0, 10]},
  {type: 'Major seventh', def: [0, 11]},
  {type: 'Octave', def: [0, 12]},

  {type: 'Major', def: [0, 4, 7]},
  {type: 'minor', def: [0, 3, 7]},
  {type: 'diminished', def: [0, 3, 6]},
  {type: 'Augmented', def: [0, 4, 8]},

  {type: 'Dominant', def: [0, 4, 7, 10]},
  {type: 'Major 7', def: [0, 4, 7, 11]},
  {type: 'minor 7', def: [0, 3, 7, 10]},
  {type: 'half-diminished 7', def: [0, 3, 6, 10]}
];

const ranges ={
  2: [0, 12], //intervals start at 0 and take up 12 items
  3: [12, 4], //triads start at 12 and there are 4 of them
  4: [16, 4]  //4-note chords start at 16 and there are 4 of them
};

export default class RandomChord extends Playable {
  constructor(bottomNote, chordSpan, numberOfNotes){
    super();

    const typesStart = ranges[numberOfNotes][0];
    const typesLength =  ranges[numberOfNotes][1];
    const root = bottomNote + Math.floor(Math.random() * chordSpan);

    this.chordType = chordTypes[typesStart + Math.floor(Math.random() * typesLength)];
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
