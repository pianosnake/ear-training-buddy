# Simple Ear Training

This is a relative pitch ear training web app. It can play a reference value
 of A440 and generate random chords and intervals. [Available live here](https://pianosnake.github.io/simple-ear-training/index.html).

Choose how many notes you'd like to hear by clicking __1__, __2__, __3__ or __4__.
 With __1__ note you can test your relative pitch.
 With __2__ notes you can test your interval recognition; for more of a challenge play the reference note and try to identify the interval pitches.
 With __3__ notes you can try recognizing major, minor, diminished or augmented triads.
 With __4__ notes  you can try recognizing chords like major 7, minor 7th, dominant and half-diminished.

The following keyboard shortcuts are provided to speed up the exercise:

- __A__ Play reference note
- __R__ Play a random note, interval or chord
- __H__ Play the hint (interval or chord played melodically)
- __SPACE__ Show the answer

The sounds are real piano samples from the [University of Iowa Musical Instrument Samples](http://theremin.music.uiowa.edu/MIS.html) available in the Public Domain.

### Developing
The `/docs` folder is used for hosting the app on GitHub. The real CSS is here.

The `/src` folder is for the source JavaScript and index.html. Symbolic links to `sounds/` and `css/` from `/docs/` allow running a
server directly from this directory while developing.
The JS code is written using ES6 modules which Chrome will load correctly based on the `import` and `export` statements.

To build the project do `npm install` to get webpack. Then then do `npm run build` which will create the `docs/index.js` bundle and will
copy index.html to `docs/` modifying the script tag.
