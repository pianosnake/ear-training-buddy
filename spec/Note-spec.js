import { Note } from '../js/Note.js';
import { RandomChord } from '../js/Chord.js';

describe('Note', () => {
  it('should create a C', () => {
    const note = new Note(60);

    expect(note.value).toEqual(60);
    expect(note.name).toEqual('C');
    expect(note.file).toEqual('/sounds/C4-97-127.mp3');
  });

  it('should create a C sharp', () => {
    const note = new Note(61);

    expect(note.value).toEqual(61);
    expect(note.name).toEqual('C♯');
    expect(note.file).toEqual('/sounds/Db4-97-127.mp3');
  });

  it('should be playable and have note data', async () => {
    const note = new Note(62);

    expect(note.value).toEqual(62);
    expect(note.name).toEqual('D');
    expect(note.file).toEqual('/sounds/D4-97-127.mp3');
    expect(note.buffer).toBeNull();

    await note.play();
    expect(note.buffer).toBeDefined();
  });
});

describe('Random Chord', () => {
  it('should create a chord from a note', () => {
    const chord = new RandomChord(59, 0, 3, false);

    expect(chord.name.indexOf('B')).toEqual(0);
  })
})
