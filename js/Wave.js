class Wave {
  constructor(file){
    this.file = file;

    if(!window.audioContext) {
      window.audioContext = new AudioContext();
    }
    this.audioContext = window.audioContext;
    this.gainNode = this.audioContext.createGain();
  }

  start(){
    this.source = this.audioContext.createBufferSource();
    const request = new XMLHttpRequest();
    request.open('GET', this.file, true);
    request.responseType = 'arraybuffer';

    request.onload = () => {
      this.audioContext.decodeAudioData(request.response)
        .then(decodedData => {
          this.source.buffer = decodedData;

          this.source.connect(this.gainNode);
          this.gainNode.connect(this.audioContext.destination);
          this.gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 3); //fade out

          this.source.start(0);
        });
      };

    request.send();
  }
  stop(){
    if(!this.source) return;
    this.source.stop();
    this.source.disconnect();
    this.source = null;
  }
}