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

## Developing 

In non-production mode the site runs from `index.js` using JS modules provided by `import` and `export` statements. Run locally by starting a webserver in the home directory.

In production mode the site uses `bundle.js`. Run `npm run build` to build the bundle file with webpack.

Tests are written in Jasmine and run in the browser at `/tests`. 
