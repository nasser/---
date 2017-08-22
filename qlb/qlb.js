var Qlb = {};

Qlb.Environment = function(table, outer) {
  this.table = table
  this.outer = outer
  this.find = function (sym) { return this.table[sym] === undefined ? (this.outer ? this.outer.find(sym) : undefined) : this.table[sym] }
  this.envForSym = function (sym) { return this.table[sym] === undefined ? (this.outer ? this.outer : undefined) : this }
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
      rest = run(rest, env);
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

    } else if(first == "عدل") {
      var sym = rest[0],
          val = rest[1]

      if(env.envForSym(sym))
        return (env.envForSym(sym).table[sym] = Qlb.eval(val, env));
      return undefined;

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
      var exps = run(exp, env);

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


function run(ast, env) {
  try {
    var val;
    var ret = [];
    for (var i = 0; i < ast.length; i++) {
      val = Qlb.eval(ast[i], env);
      ret.push(val);
    };
    return ret;
  } catch(e) {
    Qlb.handleUncaughtException(e);
  }
}

Qlb.execute = function(code) {
  try {
    var ast = Qlb.parser.parse(code);
    return run(ast, Qlb.globalEnvironment).pop();
  } catch (e) {
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

var global = this;

// Default console is window consle
Qlb.console = global.console;

// Default http adapter.
Qlb.http = {
  // Warning this is a Sync AJAX request. It's good 
  // because async is contageois and would make the interpreter async.
  // However this is bad in the main thread;
  get: function (url) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send();

    if (xhr.status === 200) {
      return xhr.responseText;
    } else {
      // XXX: Better error handling.
      Qlb.console.warn("خطأ: نص '" + url + "' غير موجود");
    }
  }
  // implement other http methods?
};

Qlb.init = function (options) {
  if (options.console) {
    Qlb.console = options.console;
  }
  if (options.ajax) {
    Qlb.ajax = options.ajax;
  }
};

