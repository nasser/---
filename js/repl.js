var snippetList = document.querySelectorAll("script[type='text/قلب']");
var snippets = {}
for(var i=0; i<snippetList.length; i++) {
  snippets[snippetList[i].getAttribute("name")] = snippetList[i].innerText;
}

function arabize (str) {
  if(typeof str == 'number' || typeof str == 'string') {
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
      replace(/\./g, "،").
      replace(/function[^}]+([;\)\(\}]|\s)+/,"<دالة>");
  } else if(typeof str == 'function') {
    return "دالة:" + str.name;

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

console.log = function(str) {
  jqconsole.Append("<span class='jqconsole-output'>" + arabize(str) + "\n</span>");
}

console.warn = function(str) {
  jqconsole.Append("<span class='jqconsole-warn'>" + arabize(str) + "\n</span>");
}

// Starts a REPL prompt.
function startPrompt () {
  jqconsole.Prompt(true, function (str) {
    // Main Enter callback.
    str = str.trim();
    var result = Qlb.execute(str)
    
    if(result != undefined)
      console.log("==> " + result);
    
    startPrompt();
  });
}

startPrompt();

function hl() {
  $(".jqconsole-old-prompt")
    // .add($(".jqconsole-prompt > span").eq(0))
    // .add($(".jqconsole-prompt .jqconsole-cursor").prev())
    .each(function(i, e) {
      if(this.innerText)
        Rainbow.color(this.innerText, "qlb", function(c) { $(e).html(c) } )
    });
}

window.onhashchange = function(e) {
  console.log(e.newURL);
}

setInterval(hl, 1000);

Qlb.execute(snippets.البداية)

function codeLink() {
  var code = event.target.getAttribute("code");
  jqconsole.Append("<span class='jqconsole-old-prompt'>&gt;&gt;&gt; " + code + "\n</span>");
  Qlb.execute(code);
}

function loadSnippet() {
  var snippet = event.target.getAttribute("name");
  var code = snippets[snippet].trim();
  var lines = code.split("\n");
  for (var i = 0; i < lines.length; i++) {
    jqconsole.Append("<span class='jqconsole-old-prompt'>..." + lines[i] + "\n</span>");
  };
  
  var result = Qlb.execute(code);
  if(result != undefined)
    console.log("==> " + arabize(result));
}

Qlb.globalEnvironment.merge({
  "حمل": function(snippet) {
    code = snippets[snippet].trim();
    lines = code.split("\n");
    for (var i = 0; i < lines.length; i++) {
      jqconsole.Append("<span class='jqconsole-old-prompt'>..." + lines[i] + "\n</span>");
    };
    
    var result = Qlb.execute(code);
    if(result != undefined)
      console.log("==> " + arabize(result));
  }
});