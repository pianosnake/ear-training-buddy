import Playable from './Playable.js';

const noteNames = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

function noteNameFromMIDINumber(num){
  const octave = Math.floor(num / 12) - 1;
  const idx = num % 12;
  return noteNames[idx] + octave;
}

class Note extends Playable {
  constructor(MIDINumber){
    super();

    this.value = MIDINumber;
    this.name = noteNameFromMIDINumber(MIDINumber);
    this.file = './sounds/' + this.name + '-97-127.mp3';
    this.notes = [this];
    this.buffer;
  }

  getAudio(audioContext){
    return new Promise((resolve, reject) =>{
      if(this.buffer){
        resolve(this.buffer);
        return;
      }

      const request = new XMLHttpRequest();
      request.open('GET', this.file, true);
      request.responseType = 'arraybuffer';

      request.onload = () => {
        audioContext.decodeAudioData(request.response, decodedData => {
          this.buffer = decodedData;
          resolve(this.buffer);
        });
      }

      request.onerror = err => reject(err);

      request.send();
    })

  }
}

export default Note;