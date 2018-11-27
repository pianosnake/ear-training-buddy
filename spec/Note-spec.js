console.log('hi')

import {Note, RandomNote, RandomDiatonicNote} from '../js/Note.js';


describe('Note', () => {
  it('should create a Note', () => {
    const note = new Note(69);

    console.log('### note is', note)
    expect(note.name).toEqual('A');
  });
 
})
