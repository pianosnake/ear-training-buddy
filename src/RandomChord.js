import Playable from './Playable.js';
import Note from './Note.js';

class RandomChord extends Playable {
  constructor(bottomNote, chordSpan){
    super();
    const root = new Note(bottomNote + Math.floor(Math.random() * chordSpan));
    const major = Math.round(Math.random()); // a 1 or 0 for major
    const third = new Note(root.value + 3 + major);  //generate a minor or major third randomly
    const fifth = new Note(root.value + 7);

    this.notes = [root, third, fifth].sort((n1, n2)=> n1.value > n2.value);  //sort in case of inversions
    this.name = root.name.slice(0, -1) + ' ' + (major ? 'Major' : 'minor'); //slice off the number from the note name
  }
}

export default RandomChord;