const noteNames = ['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B'];
function noteNameFromMIDINumber(num){
  const octave = Math.floor(num / 12) - 1;
  const idx = num % 12;
  return noteNames[idx] + octave;
}

class RandomChord {
  constructor(bottomNote, chordSpan){
    const root = new Note(bottomNote + Math.floor(Math.random() * chordSpan));
    const major = Math.round(Math.random()); // a 1 or 0 for major
    const third = new Note(root.value + 3 + major);  //generate a minor or major third randomly
    const fifth = new Note(root.value + 7);

    this.notes = [root, third, fifth];
    this.name = root.name.slice(0, -1) + ' ' + (major ? 'Major' : 'minor'); //slice off the number from the note name
  }

  play(melodic){
    if(melodic){
      this.notes.forEach((note, index) =>
          setTimeout(() =>{
            note.play();
          }, index * 200)
      );
    }else{
      this.notes.forEach(note=>note.play());
    }
  }
}

class Note{
  constructor(MIDINumber){
    this.value = MIDINumber;
    this.name = noteNameFromMIDINumber(MIDINumber);
    this.file = 'sounds/' + this.name + '-97-127.mp3';
    this.sound;
  }

  play(){
    const w = new Wave(this.file);
    this.sound = w;
    w.start();
  }
  stop(){
    if(this.sound) this.sound.stop();
  }
}