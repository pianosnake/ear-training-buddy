// Notes, Chords and Intervals get play() and stop() methods by extending Playable.

// Audio API components:
// note buffer source -> note gain node -> master gain node -> compressor -> destination

// Individual gain nodes are used to fade out the notes individually. this is especially obvious when they are played melodically at a slower tempo
// Master gain node is used to stop the sound
// Compressor is used to fix clipping from multiple notes playing at the same time

export default class Playable {
  constructor(){
    if(!window.audioContext) {
      window.audioContext = new (window.AudioContext || window.webkitAudioContext)();  //Safari 11.0.3 needs the webkitAudioContext part
    }
    this.audioContext = window.audioContext;
    this.compressor = this.audioContext.createDynamicsCompressor();
    this.compressor.attack.value = 0.03;
    this.masterGainNode = this.audioContext.createGain();
    this.masterGainNode.connect(this.compressor);
    this.compressor.connect(this.audioContext.destination);
  }

  play(noteDistance){
    this.masterGainNode.gain.setValueAtTime(1, this.audioContext.currentTime);

    //load the audio for all the notes so they can all play at the same time
    Promise.all(this.notes.map(note => note.getAudio(this.audioContext)))
      .then(() =>{
        this.notes.forEach((note, index) =>{
          const source = this.audioContext.createBufferSource();
          const gainNode = this.audioContext.createGain();  //create a gain node for each note
          const offset = noteDistance ? index * noteDistance : 0;

          source.buffer = note.buffer;
          source.connect(gainNode);
          gainNode.connect(this.masterGainNode);
          gainNode.gain.setTargetAtTime(0, this.audioContext.currentTime + offset, 0.5); //fade out
          source.start(this.audioContext.currentTime + offset, 0, 3); //end around the same time as the fadeout
        })
      })
  }

  stop(){
    this.masterGainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
  }
}