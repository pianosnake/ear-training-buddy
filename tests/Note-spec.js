import { Note } from '../js/Note.js';
import { Chord, randomChord, randomPivotChord } from '../js/Chord.js';

describe('Note', () => {
  it('should create a C', () => {
    const note = new Note(60);

    expect(note.value).toEqual(60);
    expect(note.name).toEqual('C');
    expect(note.file).toEqual('../sounds/C4-97-127.mp3');
  });

  it('should create a C sharp', () => {
    const note = new Note(61);

    expect(note.value).toEqual(61);
    expect(note.name).toEqual('C♯');
    expect(note.file).toEqual('../sounds/Db4-97-127.mp3');
  });

  it('should be playable and have note data', async () => {
    const note = new Note(62);

    expect(note.value).toEqual(62);
    expect(note.name).toEqual('D');
    expect(note.file).toEqual('../sounds/D4-97-127.mp3');
    expect(note.buffer).toBeNull();

    await note.play();
    expect(note.buffer).not.toBeNull();
  });
});

describe('Random Chord', () => {
  it('should create a chord from a note', () => {
    const chord = randomChord(59, 0, 3, false);

    expect(chord.name.indexOf('B')).toEqual(0);
  })
})

describe('Random Pivot Chords', () => {
  const reps = 10;
  it('all generated 2-note chords should contain the pivot note', () => {
    const pivotValue = 54;
    for (let i = 0; i < reps; i++) {
      const chord = randomPivotChord(pivotValue, 2);
      expect(chord.notes.map(n => n.value)).toContain(pivotValue);
    }
  })

  it('all generated 3-note chords should contain the pivot note', () => {
    const pivotValue = 55;
    for (let i = 0; i < reps; i++) {
      const chord = randomPivotChord(pivotValue, 3);
      expect(chord.notes.map(n => n.value)).toContain(pivotValue);
    }
  })

  it('all generated 4-note chords should contain the pivot note', () => {
    const pivotValue = 56;
    for (let i = 0; i < reps; i++) {
      const chord = randomPivotChord(pivotValue, 4);
      expect(chord.notes.map(n => n.value)).toContain(pivotValue);
    }
  })
})

describe('Chord', () => {
  it('should create a major chord', () => {
    const cMajor = new Chord(60, 'Major', [0, 4, 7]);
    expect(cMajor.notes.map(n => n.name)).toEqual(['C', 'E', 'G']);
    expect(cMajor.name).toEqual('C Major');
  });

  it('should create a minor chord', () => {
    const aSharpMinor = new Chord(58, 'minor', [0, 3, 7]);
    expect(aSharpMinor.notes.map(n => n.name)).toEqual(['A♯', 'C♯', 'F']);
    expect(aSharpMinor.name).toEqual('A♯ minor');
  });

  it('should voice the chord', () => {
    const cMajor = new Chord(60, 'minor 7', [0, 3, 7, 10], true);
    expect(cMajor.notes.map(n => n.value)).toEqual([60 - 12, 63, 67, 70 - 12]);
  });
})
