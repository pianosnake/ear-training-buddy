# Ear Training Buddy

This is the patient ear training buddy you've always wanted. It's a web app that can play notes, intervals and chords
randomly or diatonically. [Available live here](https://pianosnake.github.io/ear-training-buddy/index.html).

Choose how many notes you'd like to hear played at once by clicking __1__, __2__, __3__ or __4__.

*  With __1__ note you can test your relative pitch by comparing the played note to the reference note.
*  With __2__ notes you can test your interval recognition. For more of a challenge play the reference note and try to identify the interval pitches. In diatonic mode, Buddy will play both random notes from the major key of the reference note.
*  With __3__ notes you can try recognizing major, minor, diminished or augmented triads. For more of a challenge name the root of the chord or try to hear the relationship of the reference note within the played chord, ie, _A_ would be a 6th in _F Major_.
*  With __4__ notes  you can try recognizing chords like major 7, minor 7th, dominant, major 6th, minor major and half-diminished.

Some extra options exist for making the exercise harder or easier:

* In __Diatonic__ mode the random notes or chords will be taken from the major key of the reference note.
* __Make reference note part of chord__ option will 'pivot' the 3 or 4 note chord around the reference note. If _A_ is the reference note, Buddy might play an _F Major_ chord because _A_ is the 3rd of that chord. Buddy won't play an _E flat Major_ because that chord does not contain A.
* With __Open voicings__ checked, Buddy will play the 3 and 4 note chords with an open piano voicing, spreading the notes over the
keyboard for a more realistic playing style.

The following keyboard shortcuts are provided to speed up the exercise:

- __A__ Play reference note
- __R__ Play a random note, interval or chord
- __H__ Play the interval or chord melodically. Plays slower each time it's pressed.
- __SPACE__ Show the answer

The sounds are real piano samples from the [University of Iowa Musical Instrument Samples](http://theremin.music.uiowa.edu/MIS.html) available in the Public Domain.

### Developing
The `/docs` folder is used for hosting the app on GitHub. The real CSS is here.

The `/src` folder is for the source JavaScript and index.html. Symbolic links to `docs/sounds/` and `docs/css/` allow running a
server directly from this directory while developing.
The JS code is written using ES6 modules which Chrome will load correctly based on the `import` and `export` statements.

To build the project do `npm install` to get webpack. Then then do `npm run build` which will create the `docs/index.js` bundle and will
copy index.html to `docs/` modifying the script tag.
