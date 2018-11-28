// Notes, Chords and Intervals get play() and stop() methods by extending Playable.

// Audio API components:
// note buffer source -> note gain node -> master gain node -> compressor -> destination

// Individual gain nodes are used to fade out the notes individually. this is especially obvious when
// they are played melodically at a slower tempo
// Master gain node is used to stop the current Playable
// Compressor is used to fix clipping from multiple notes playing at the same time

let audioContext;
let compressor;
let masterGainNode;

export default class Playable {
  constructor() {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();  //Safari 11.0.3 needs the webkitAudioContext part
    }
    if (!compressor) {
      compressor = audioContext.createDynamicsCompressor();
      compressor.connect(audioContext.destination);
    }
    compressor.attack.setValueAtTime(0.03, audioContext.currentTime);

    if (!masterGainNode) {
      masterGainNode = audioContext.createGain();
      masterGainNode.connect(compressor);
    }
  }

  //noteDistance is how long to wait to play the note after invoking this method
  play(noteDistance) {
    masterGainNode.gain.setValueAtTime(1, audioContext.currentTime);

    //load the audio for all the notes so they can all play at the same time
    return Promise.all(this.notes.map(note => note.getAudio(audioContext)))
      .then(() => {
        this.notes
          .sort((a, b) => a.value - b.value)  //sort in case the chord is voiced or inverted
          .forEach((note, index) => {
            const source = audioContext.createBufferSource();
            const gainNode = audioContext.createGain();  //create a gain node for each note
            const offset = noteDistance ? index * noteDistance : 0;

            source.buffer = note.buffer;
            source.connect(gainNode);
            gainNode.connect(masterGainNode);
            gainNode.gain.setTargetAtTime(0, audioContext.currentTime + offset, 0.5); //fade out
            source.start(audioContext.currentTime + offset, 0, 2.5); //end around the same time as the fadeout
          })
      })
  }

  stop() {
    masterGainNode.gain.setValueAtTime(0, audioContext.currentTime);
  }
}
