class Playable {
    constructor(){
      this.melodicPlaybackNoteDistance = 200;
    }
   play(melodic){
    if(melodic){
      this.notes.forEach((note, index) =>
          setTimeout(() =>{
            note.play();
          }, index * this.melodicPlaybackNoteDistance)
      );
    }else{
      this.notes.forEach(note=>note.play());
    }
  }
}

export default Playable;