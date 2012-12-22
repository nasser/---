// Number.prototype.toString = function() {
//   return "?";
// }

var Qlb = {};
Qlb.init = function(onloaded) {
  // Load grammar from separate file, because dealing with JavaScripts lack of multiline strings AND Arabic input is just too much. Just too much.
  jx.load("/peg/qlb.peg", function(grammar) {
    // Load grammar
    Qlb.parser = PEG.buildParser(grammar);

    // Default console is window consle
    if(Qlb.console === 'undefined') Qlb.console = window.console;

    // Create symbol table
    Qlb.symbols = {
  "قول": 
  function(str) {
    Qlb.console.log(str);
  },

  "ضمن":
   function(url) {
      jx.load("/lib/" + url + ".قلب", function(code) {
       Qlb.run(code);
      }, function(error) {
        Qlb.console.warn("خطأ: نص '" + url + "' غير موجود");
      }, false);
   },
   
  "أكبر":
  function() {
    var args = Array.prototype.slice.call(arguments);
    return args.reduce(function(prv, cur, idx, ary) {
      if(idx > 0) return prv && ary[idx - 1] > ary[idx];
      else return true;
    });
  },

  "أصغر":
  function() {
    var args = Array.prototype.slice.call(arguments);
    return args.reduce(function(prv, cur, idx, ary) {
      if(idx > 0) return prv && ary[idx - 1] < ary[idx];
      else return true;
    });
  },

  "أجمع":
  function() {
    var args = Array.prototype.slice.call(arguments);
    return args.reduce(function(prv, cur, idx, ary) {
      return prv + cur;
    });
  },

  "طرح":
  function() {
    var args = Array.prototype.slice.call(arguments);
    return args.reduce(function(prv, cur, idx, ary) {
      return prv - cur;
    });
  }
  }

      Qlb.macros = {
        "نفذ":
        function(ast) {
          return Qlb.eval(ast.value);
        },

        "إذا":
        function(cond, iftrue, iffalse) {
          Qlb.eval(cond) ? Qlb.eval(iftrue) : Qlb.eval(iffalse);
        },

        "حدد":
         function(sym, val) {
           Qlb.symbols[sym.value] = val.type == "list" ? val : val.value;
         }
      }

    Qlb.eval = function(exp) {
      if(typeof exp == "string") {            // evaling string/symbol
        var sym = Qlb.symbols[exp];
        return sym ? sym : exp;

      } else if(!(exp instanceof Array)) {    // evaling literal
        return exp;

      } else {                                // evaling list
        var exps = exp.map(function(p) { return Qlb.eval(p) })
        if(typeof exps[0] == "function")
          // first element evaluates to a function
          return exps.shift().apply(this, exps)
        else
          // literal array
          return exps
      }
    }

    Qlb.run = function(code) {
      try {
        var ast = Qlb.parser.parse(code);
        // ast.value = ast.value.reverse(); // why?
        return Qlb.eval(ast);
      } catch(e) {
        Qlb.handleUncaughtException(e);
      }
    }

    Qlb.handleUncaughtException = function(e) {
      switch(e.name) {
        case "SyntaxError":
          Qlb.console.warn("خطأ: حرف '" + e.found + "' غير متوقع");
          break;
        default:
          throw e;
      }
    }

    if(onloaded) onloaded();
  });
}


