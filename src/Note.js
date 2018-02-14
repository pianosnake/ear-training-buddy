import Playable from './Playable.js';

//these note names used to retrive the right files
const noteNames = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
const enharmonicNames = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];

function fileNameFromMIDINumber(num){
  //ie 69 into ./sounds/A4-97-127.mp3
  const octave = Math.floor(num / 12) - 1;
  const idx = num % 12;
  return './sounds/' + noteNames[idx] + octave + '-97-127.mp3';
}

const diatonicOffsets = [0, 2, 4, 5, 7, 9, 11];

export class Note extends Playable {
  constructor(MIDINumber){
    super();

    this.value = MIDINumber;
    this.file = fileNameFromMIDINumber(MIDINumber);
    this.name = enharmonicNames[this.value % 12];
    this.notes = [this];
    this.buffer;
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

export class RandomNote extends Note{
  constructor(bottomNote, questionSpan){
    const value = bottomNote + Math.floor(Math.random() * questionSpan);
    super(value);
  }
}


export class RandomDiatonicNote extends Note{
  constructor(referenceNote){
    const octaveOffset = Math.round(Math.random()) * 12
    const value = referenceNote.value - octaveOffset + diatonicOffsets[Math.floor(Math.random() *  diatonicOffsets.length)];
    super(value);
  }
}
