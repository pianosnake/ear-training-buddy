export const chordTypes = {
  //definition is an array of semitones from root
  chromatic: {
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
      {type: 'minor Major 7', def: [0, 3, 7, 11]},
      {type: 'half-diminished 7', def: [0, 3, 6, 10]}
    ]
  },

  diatonic: {
    1: [
      {type: 'Do', def: [0]},
      {type: 'Re', def: [2]},
      {type: 'Mi', def: [4]},
      {type: 'Fa', def: [5]},
      {type: 'Sol', def: [7]},
      {type: 'La', def: [9]},
      {type: 'Ti', def: [11]}
    ],
    //2: diatonic intervals are built by getting two diatonic notes
    3: [
      {type: 'Major (I)', def: [0, 4, 7]},
      {type: 'minor (ii)', def: [2, 5, 9]},
      {type: 'minor (iii)', def: [4, 7, 11]},
      {type: 'Major (IV)', def: [5, 9, 12]},
      {type: 'Major (V)', def: [7, 11, 14]},
      {type: 'minor (vi)', def: [9, 12, 16]},
      {type: 'diminished (vii °)', def: [11, 14, 17]}
    ],
    4: [
      {type: 'Major 7 (I)', def: [0, 4, 7, 11]},
      {type: 'minor 7 (ii)', def: [2, 5, 9, 12]},
      {type: 'minor 7 (iii)', def: [4, 7, 11, 14]},
      {type: 'Major 7 (IV)', def: [5, 9, 12, 16]},
      {type: 'Dominant (V7)', def: [7, 11, 14, 17]},
      {type: 'minor 7 (vi)', def: [9, 12, 16, 19]},
      {type: 'half-diminished 7 (vii ø)', def: [11, 14, 17, 21]}
    ]
  }
};

export function pickRandom(array){
  return array[Math.floor(Math.random() * array.length)];
}