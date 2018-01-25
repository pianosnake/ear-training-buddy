class KeyboardShortcut {
  constructor(listenFor, callback){

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