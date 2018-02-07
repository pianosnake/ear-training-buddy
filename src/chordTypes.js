export const chordTypes = {
  //definition is an array of semitones from root
  2: [
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
    {type: 'Octave', def: [0, 12]}
  ],
  3: [
    {type: 'Major', def: [0, 4, 7]},
    {type: 'minor', def: [0, 3, 7]},
    {type: 'diminished', def: [0, 3, 6]},
    {type: 'Augmented', def: [0, 4, 8]}
  ],
  4: [
    {type: 'Dominant', def: [0, 4, 7, 10]},
    {type: 'Major 7', def: [0, 4, 7, 11]},
    {type: 'Major 6', def: [0, 4, 7, 9]},
    {type: 'minor 7', def: [0, 3, 7, 10]},
    {type: 'half-diminished 7', def: [0, 3, 6, 10]}
  ]
};