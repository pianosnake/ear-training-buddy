import Playable from './Playable.js';
import Note from './Note.js';

//index in array corresponds to semi-tones from root
const intervalNames = ['Unison', 'Minor second', 'Major second', 'Minor third', 'Major third', 'Fourth', 'Tritone', 'Fifth', 'Minor sixth', 'Major sixth', 'Minor seventh', 'Major seventh', 'Octave'];

export default class RandomInterval extends Playable {
  constructor(bottomNote, range){
    super();

    const first = new Note(bottomNote + Math.floor(Math.random() * range));
    const second = new Note(first.value + 1 + Math.floor(Math.random() * 11)); //don't play unisons

    this.notes = [first, second];
    this.name = `${intervalNames[second.value - first.value]} (${first.name}-${second.name})`;
  }
}
