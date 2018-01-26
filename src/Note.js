import Wave from './Wave.js';

const noteNames = ['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B'];

function noteNameFromMIDINumber(num){
  const octave = Math.floor(num / 12) - 1;
  const idx = num % 12;
  return noteNames[idx] + octave;
}

class Note{
  constructor(MIDINumber){
    this.value = MIDINumber;
    this.name = noteNameFromMIDINumber(MIDINumber);
    this.file = 'sounds/' + this.name + '-97-127.mp3';
    this.sound;
  }

  play(){
    this.sound = new Wave(this.file);
    this.sound.start();
  }
  stop(){
    if(this.sound) this.sound.stop();
  }
}

export default Note;