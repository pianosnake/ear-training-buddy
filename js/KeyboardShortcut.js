class KeyboardShortcut {
  constructor(listenFor, callback){

    // every time this is instantiated it takes the existing
    // window onkeyup event and wraps it in a new method

    const existingListener = window.onkeyup;

    window.onkeyup = function(e){

      if(existingListener){
        existingListener(e);
      }

      if(e.key === listenFor){
        callback();
      }
    }
  }
}

export default KeyboardShortcut;