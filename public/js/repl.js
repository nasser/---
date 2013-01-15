function arabize (str) {
  if(typeof str == 'number') {
    return str.toString().
      replace(/1/g, "١").
      replace(/2/g, "٢").
      replace(/3/g, "٣").
      replace(/4/g, "٤").
      replace(/5/g, "٥").
      replace(/6/g, "٦").
      replace(/7/g, "٧").
      replace(/8/g, "٨").
      replace(/9/g, "٩").
      replace(/0/g, "٠").
      replace(/\./g, "،");
  } else if(str === true) {
    return "صح";

  } else if(str === false) {
    return "خطأ";

  } else if(str instanceof Array) {
    return str.map(function(e) { return arabize(e) }).toString().replace(/,/g, " ");

  } else {
    return str;
  }
}

// Instantiate the console widget.
var jqconsole = $('#console').jqconsole('', '>>> ');
jqconsole.RegisterMatching('(', ')', 'parans');
jqconsole.RegisterShortcut('C', function() {
  this.AbortPrompt();
  startPrompt();
}); 
jqconsole.RegisterShortcut('A', function() {
  this.MoveToStart();
}); 
jqconsole.RegisterShortcut('E', function() {
  this.MoveToEnd();
});

// Starts a REPL prompt.
function startPrompt () {
  jqconsole.Prompt(true, function (str) {
    // Main Enter callback.
    str = str.trim();
    if (str) {
      interpreter.execute(str);
    } else {
      startPrompt();
    }
  }, function (str, callback) {
    // Line continuation callback.
    // Note that It's async because the qlb is in a worker.
    interpreter.isLineEnd(str, callback);
  }, true);
}

// Create the worker with the worker adapter.
var worker = new Worker('js/worker.js');

// The main interpreter wrapper.
var interpreter = {
  // Called with result from qlb execution by worker.onmessage.
  result: function (str) {
    jqconsole.Write('==> ' + arabize(str) + '\n', 'jqconsole-output');
    // Restart the prompt.
    startPrompt();
  },
  // Called with prints from qlb by worker.onmessage.
  log: function (str) {
    jqconsole.Write(arabize(str) + '\n', 'jqconsole-output', false);
  },
  // Called with erros from qlb execution by worker.onmessage.
  warn: function (str) {
    jqconsole.Write('\n' + str + '\n\n', 'jqconsole-warn', false);
    // Restart the prompt.
    startPrompt();
  },
  // Sends an execute command to the worker.
  execute: function (str) {
    worker.postMessage({
      type: 'execute',
      data: str
    });
  },
  // Asks the worker if the command at hand is done or needs more lines.
  isLineEnd: function (str, callback) {
    // When done the worker will send a message with type `isLineEndResult`
    // attatch the callback to that.
    interpreter.isLineEndResult = callback;
    worker.postMessage({
      type: 'isLineEnd',
      data: str
    });
  }
};

// Worker message router.
worker.onmessage = function (event) {
  var type = event.data.type,
      data = event.data.data;
  if (interpreter[type]) {
    interpreter[type](data);
  }
};

// Delegate events from examples etc.
$(document).on('click', 'a.execute', function () {
  jqconsole.SetPromptText('(' + decodeURI(this.href).match(/#(.*)/)[1] + ')');
  jqconsole._HandleEnter();
});

$(document).on('click', 'a.load', function () {
  var url = this.href.match(/#(.*)/)[1];
  $.get("/lib/" + url + ".qlb", function(code) {
    jqconsole.SetPromptText(code);
  });
});

// Go!
interpreter.execute('(ضمن "mtfaail/mtfaail")');
startPrompt();
