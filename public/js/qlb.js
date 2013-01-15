var Qlb = {};

Qlb.Environment = function(table, outer) {
  this.table = table
  this.outer = outer
  this.find = function (sym) { return this.table[sym] === undefined ? (this.outer ? this.outer.find(sym) : undefined) : this.table[sym] }
  this.merge = function(other) { for(var name in other) { Qlb.symbols[name] = true; this.table[name] = other[name] } }
};

Qlb.globalEnvironment = new Qlb.Environment({});

Qlb.symbols = {
  "حرفي": true,
  "إفعل": true,
  "إذا": true,
  "حدد": true,
  "لامدا": true
};

Qlb.isSymbol = function(sym) {
  return !!Qlb.symbols[sym];
};

Qlb.eval = function(exp, env) {
  if(typeof exp == "string") {            // evaling string/symbol
    var sym = env.find(exp);
    if(sym === undefined) return exp;
    else return sym;

  } else if(!(exp instanceof Array)) {    // evaling literal
    return exp;

  } else {                                // evaling list
    var first = exp[0]
    var rest = exp.slice(1)

    if(first == "حرفي") {
      return rest

    } else if(first == "إفعل") {
      rest = rest.map(function(e) { return Qlb.eval(e, env) });
      return rest[rest.length - 1];

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

      else if(Qlb.isSymbol(exps[0])) {
        throw new ReferenceError(exps[0]);

      } else
        // return last element
        return exps[exps.length - 1];

    }
  }
};

Qlb.execute = function(code) {
  try {
    var ast = Qlb.parser.parse(code);
    var val;
    for (var i = 0; i < ast.length; i++) {
      val = Qlb.eval(ast[i], Qlb.globalEnvironment);
    };
    return val;

  } catch(e) {
    Qlb.handleUncaughtException(e);

  }
};

Qlb.handleUncaughtException = function(e) {
  switch(e.name) {
    case "SyntaxError":
      Qlb.console.warn("خطأ: حرف '" + e.found + "' غير متوقع");
      break;

    case "ReferenceError":
      Qlb.console.warn("خطأ: رمز '" + e.message + "' غير موجود");
      break;

    default:
      throw e;

  }
};

// Default console is window consle
if(Qlb.console === 'undefined') Qlb.console = window.console;

Qlb.init = function (options) {
  if (options.console) {
    Qlb.console = options.console;
  }
};
