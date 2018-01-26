import Playable from './Playable.js';
import Note from './Note.js';

const intervalNames = ['Unison', 'Minor second', 'Major second', 'Minor third', 'Major third', 'Fourth', 'Tritone', 'Fifth', 'Minor sixth', 'Major sixth', 'Minor seventh', 'Major seventh', 'Octave'];

class RandomInterval extends Playable {
  constructor(bottomNode, range){
    super();
    const first = new Note(bottomNote + Math.floor(Math.random() * range));
    const second = new Note(first.value + 1 + Math.floor(Math.random() * 11)); //don't play unisons

    this.notes = [first, second];
    this.name = `${intervalNames[second.value - first.value]} (${first.name}-${second.name})`;
    this.melodicPlaybackNoteDistance = 800;
  }
}

export default RandomInterval;