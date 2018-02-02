import Playable from './Playable.js';

const noteNames = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

function noteNameFromMIDINumber(num){
  const octave = Math.floor(num / 12) - 1;
  const idx = num % 12;
  return noteNames[idx] + octave;
}

export default class Note extends Playable {
  constructor(MIDINumber){
    super();

    this.value = MIDINumber;
    this._name = noteNameFromMIDINumber(MIDINumber);
    this.file = './sounds/' + this._name + '-97-127.mp3';
    this.notes = [this];
    this.buffer;
  }

  get name(){
    if(this._name[1] === 'b'){
      return this._name.replace('b', '♭');
    }else{
      return this._name;
    }
  }

  getAudio(audioContext){
    // keep the decoded audio data in note.buffer so that we don't load the file
    // and decode it every time we want to play the note

    return new Promise((resolve, reject) =>{
      if(this.buffer){
        resolve(this.buffer);
        return;
      }

      const request = new XMLHttpRequest();
      request.open('GET', this.file, true);
      request.responseType = 'arraybuffer';

      request.onload = () => {
        audioContext.decodeAudioData(request.response, decodedData => {  //Safari 11.0.3 needs this as a callback, not a Promise
          this.buffer = decodedData;
          resolve(this.buffer);
        });
      }

      request.onerror = err => reject(err);

      request.send();
    })

  }
}
