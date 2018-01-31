class Playable {
  constructor(){
    if(!window.audioContext) {
      window.audioContext = new (window.AudioContext || window.webkitAudioContext)();  //Safari needs the webkitAudioContext part
    }
    this.audioContext = window.audioContext;
    this.compressor = this.audioContext.createDynamicsCompressor();

    this.gainNode = this.audioContext.createGain();
    this.gainNode.connect(this.compressor);
    this.compressor.connect(this.audioContext.destination);

    this.melodicDelay = 0.2;
  }

  play(melodic){
    this.gainNode.gain.setValueAtTime(1, this.audioContext.currentTime);

    Promise.all(this.notes.map(note =>{
      return note.getAudio(this.audioContext)
    }))
      .then(() =>{
        this.notes.forEach((note, index) =>{
          const source = audioContext.createBufferSource();
          const offset = melodic ? index * this.melodicDelay : 0;

          source.buffer = note.buffer;
          source.connect(this.gainNode);
          source.start(this.audioContext.currentTime + offset, 0, 3); //end around the same time as the fadeout
        })
        this.gainNode.gain.setTargetAtTime(0, this.audioContext.currentTime + 1, 0.5); //fade out
      })
  }

  stop(){
      this.gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
  }
}

export default Playable;