var Qlb = {};

Qlb.Environment = function(table, outer) {
  this.table = table
  this.outer = outer
  this.find = function (sym) { return this.table[sym] === undefined ? (this.outer ? this.outer.find(sym) : undefined) : this.table[sym] }
  this.merge = function(other) { for(var name in other) this.table[name] = other[name] }
}

Qlb.globalEnvironment = new Qlb.Environment({
  "قول":
  function(str) {
    Qlb.console.log(str);
  },

  "ضمن":
   function(url) {
      jx.load("/lib/" + url + ".قلب", function(code) {
       return Qlb.execute(code);
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
});

Qlb.init = function(onloaded) {
  // Load grammar from separate file, because dealing with JavaScripts lack of
  // multiline strings AND Arabic input is just too much. Just too much.
  jx.load("/peg/qlb.peg", function(grammar) {
    // Load grammar
    Qlb.parser = PEG.buildParser(grammar);

    // Default console is window consle
    if(Qlb.console === 'undefined') Qlb.console = window.console;

    Qlb.eval = function(exp, env) {
      if(typeof exp == "string") {            // evaling string/symbol TODO make this better
        var sym = env.find(exp);
        return sym || exp;

      } else if(!(exp instanceof Array)) {    // evaling literal
        return exp;

      } else {                                // evaling list
        var first = exp[0]
        var rest = exp.slice(1)

        if(first == "حرفي") {
          return rest

        } else if(first == "إذا") {
          var test = rest[0],
              ifex = rest[1],
              elex = rest[2]

          return Qlb.eval(Qlb.eval(test, env) ? ifex : elex, env)

        } else if(first == "حدد") {
          var sym = rest[0],
              val = rest[1]
          return (env.table[sym] = Qlb.eval(val, env))

        } else if(first == "لامدا") {
          var params = rest[0],
              body = rest.slice(1)

          return function() {
            var table = {}
            for (var i = 0; i < params.length; i++)
              table[params[i]] = arguments[i]

            return Qlb.eval(body, new Qlb.Environment(table, env))
          }

        } else {
          var exps = exp.map(function(p) { return Qlb.eval(p, env) })
          if(typeof exps[0] == "function")
            // first element evaluates to a function
            return exps.shift().apply(this, exps)

          else
            // literal array
            return exps

        }
      }
    }

    Qlb.execute = function(code) {
      try {
        var ast = Qlb.parser.parse(code);
        // ast.value = ast.value.reverse(); // why?
        return Qlb.eval(ast, Qlb.globalEnvironment);

      } catch(e) {
        Qlb.handleUncaughtException(e);

      }
    }

    Qlb.handleUncaughtException = function(e) {
      switch(e.name) {
        case "SyntaxError":
          throw e;
          Qlb.console.warn("خطأ: حرف '" + e.found + "' غير متوقع");
          break;

        default:
          throw e;

      }
    }

    if(onloaded) onloaded();
  });
}


