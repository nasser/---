importScripts(
  '../qlb/qlb.js',
  '../qlb/parser.js', 
  '../qlb/primitives.js'
);

var actions = {
  isLineEnd: function (str) {
    function callback (result) {
      postMessage({
        type: 'isLineEndResult',
        data: result
      });
    }
    if (/\n\s*$/.test(str)) {
      // Empty line, don't continue.
      callback(false);
    } else {
      try {
        Qlb.parser.parse(str);
        callback(false);
      } catch (e) {
        if (/\)$/.test(str)) {
          // Indent once.
          callback(1);
        } else {
          // Continue line just don't indent.
          callback(0);
        }
      } 
    }
  },
  execute: function (data) {
    var ret = Qlb.execute(data);
    // XXX: Fix.
    // Execute may return a function and worker messaging can't handle
    // function transport.
    if (typeof ret === 'function') {
      ret = undefined;
    }
    if (ret !== undefined) {
      postMessage({
        type: 'result',
        data: ret
      });  
    }
  }
};

Qlb.init({
  console: {
    log: function (str) {
      postMessage({
        type: 'log',
        data: str
      });
    },
    warn: function (str) {
      postMessage({
        type: 'warn',
        data: str
      });
    }
  }
});

self.onmessage = function (event) {
  var action = event.data.type,
      data   = event.data.data;
  if (actions[action]) {
    actions[action](data);
  }
};
