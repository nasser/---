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

function startPrompt () {
  jqconsole.Prompt(true, function (str) {
    str = str.trim();
    if (str) {
      interpreter.execute(str);
    } else {
      startPrompt();
    }
  }, function (str, callback) {
    interpreter.isLineEnd(str, callback);
  }, true);
}

var worker = new Worker('js/worker.js');
var interpreter = {
  result: function (str) {
    jqconsole.Write('==> ' + arabize(str) + '\n', 'jqconsole-output');
    startPrompt();
  },
  log: function (str) {
    jqconsole.Write(arabize(str) + '\n', 'jqconsole-output', false);
  },
  warn: function (str) {
    jqconsole.Write('\n' + str + '\n\n', 'jqconsole-warn', false);
    startPrompt();
  },
  execute: function (str) {
    worker.postMessage({
      type: 'execute',
      data: str
    });
  },
  isLineEnd: function (str, callback) {
    interpreter.isLineEndResult = callback;
    worker.postMessage({
      type: 'isLineEnd',
      data: str
    });
  }
};

worker.onmessage = function (event) {
  var type = event.data.type,
      data = event.data.data;
  if (interpreter[type]) {
    interpreter[type](data);
  }
};

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


interpreter.execute('(ضمن "mtfaail/mtfaail")');
startPrompt();
