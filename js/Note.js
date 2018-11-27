import Playable from './Playable.js';
import {chordTypes, pickRandom} from './definitions.js';

//these note names used to retrieve the right files
const noteNames = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
const enharmonicNames = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];

function fileNameFromMIDINumber(num){
  //69 => ./sounds/A4-97-127.mp3
  const octave = Math.floor(num / 12) - 1;
  const idx = num % 12;
  return '/sounds/' + noteNames[idx] + octave + '-97-127.mp3';
}

export class Note extends Playable {
  constructor(MIDINumber){
    super();

    this.value = parseInt(MIDINumber);
    this.file = fileNameFromMIDINumber(this.value);
    this.name = enharmonicNames[this.value % 12];
    this.notes = [this];
    this.buffer = null;
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
    const octaveOffset = Math.round(Math.random()) * 12; //randomly lower by 1 octave
    const r = pickRandom(chordTypes['diatonic'][1]);
    const value = referenceNote.value + r.def[0]  - octaveOffset;

    super(value);

    this.name = enharmonicNames[this.value % 12] + ' / ' + r.type;
  }
}
