# Simple Ear Training

This is a simple mobile-friendly ear training web app. It can play a reference value
 of A440 and generate random chords and intervals. [Available live here](https://pianosnake.github.io/simple-ear-training/index.html).

 The following keyboard shortcuts are provided to speed  up the exercise:
 
- __A__ Play reference note
- __R__ Play a random interval or chord
- __H__ Play the hint (interval or chord played melodically)
- __SPACE__ Show the answer

The sounds are real piano samples from the [University of Iowa Musical Instrument Samples](http://theremin.music.uiowa.edu/MIS.html) available in the Public Domain.

### Developing
The `/docs` folder is used for hosting the app on GitHub. The real index.html and CSS are here.

The `/src` folder is for the JS. You can have a symbolic link here to `index.html` and `css/` from `/docs/` so that you can run a server directly from this folder while you're developing. Chrome will load the JS modules correctly based on the ES6 `import` and `export` statements.

To build the project do `npm install` to get webpack. Then then do `npm run build` which will create the `docs/index.js` bundle.

