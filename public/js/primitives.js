Qlb.globalEnvironment.merge({
  // general

  "رأس":          // head
  function(x) {
    return x[0];
  },

  "ذيل":    // tail
  function(x) {
    return x.slice(1);
  },

  "كونس":    // cons
  function(x, y) {
    return [x].concat(y)
  },

  "طول":    // cons
  function(lst) {
    return lst.length;
  },

  "حال":    // cond
  function() {
    for (var i = 0; i < arguments.length; i++) {
      var cond = Qlb.eval(arguments[i][0]),
          val = arguments[i][1];
    }
  },

  "عدم": // null
  function() {
    return [];
  },

  "عدم؟": // null?
  function(lst) {
    return lst instanceof Array && lst.length == 0;
  },

  "لائحة؟": // list?
  function(lst) {
    return lst instanceof Array;
  },

  "و":    // and
  function() {
    var args = Array.prototype.slice.call(arguments);
    return args.reduce(function(prv, cur, idx, ary) {
      if(idx > 0) return prv && !!cur;
      else return !!cur;
    });
  },

  "أو":    // or
  function() {
    var args = Array.prototype.slice.call(arguments);
    return args.reduce(function(prv, cur, idx, ary) {
      if(idx > 0) return prv || !!cur;
      else return !!cur;
    });
  },

  "طبق":    // map
  function(fn, lst) {
    return lst.map(fn);
  },

  // input/output

  "قول":    // say
  function(str) {
    Qlb.console.log(str);
    return str;
  },

  "ضمن":    // require
  function(url) {
      jx.load("/lib/" + url.replace("\\", "/") + ".qlb", function(code) {
      return Qlb.execute(code);
    }, function(error) {
      Qlb.console.warn("خطأ: نص '" + url + "' غير موجود");
    }, false);
  },

  "ضمن-تمديد":    // require-extension
  function(url) {
    loadJS("/lib/tamdeed/" + url + ".js");
  },

  // comparison
   
  "يساوي؟":     // equals
  function(a, b) {
    return a == b;
  },

  "أكبر؟":     // greater
  function(a, b) {
    return a > b;
  },

  "أكبر-أو-يساوي؟":     // greater or equal 
  function(a, b) {
    return a >= b;
  },

  "أصغر؟":     // less
  function(a, b) {
    return a < b
  },

  "أصغر-أو-يساوي؟":     // less or equal
  function(a, b) {
    return a <= b;
  },

  // arithmetic

  "سقف":     // ceil
  function(x) {
    return Math.ceil(x)
  },

  "أرض":     // floor
  function(x) {
    return Math.floor(x)
  },

  "القيمة-المطلقة":     // abs
  function(x) {
    return Math.abs(x)
  },

  "الأكبر":     // max
  function() {
    var args = Array.prototype.slice.call(arguments);
    return args.reduce(function(prv, cur, idx, ary) {
      if(idx > 0) return cur > prv ? cur : prv
      else return cur
    });
  },

  "الأصغر":     // min
  function() {
    var args = Array.prototype.slice.call(arguments);
    return args.reduce(function(prv, cur, idx, ary) {
      if(idx > 0) return cur < prv ? cur : prv
      else return cur
    });
  },

  "جمع":     // add
  function() {
    var args = Array.prototype.slice.call(arguments);
    return args.reduce(function(prv, cur, idx, ary) {
      return prv + cur;
    });
  },

  "طرح":    // subtract
  function() {
    var args = Array.prototype.slice.call(arguments);
    return args.reduce(function(prv, cur, idx, ary) {
      return prv - cur;
    });
  },

  "ضرب":     // multiply
  function() {
    var args = Array.prototype.slice.call(arguments);
    return args.reduce(function(prv, cur, idx, ary) {
      return prv * cur;
    });
  },

  "قسم":     // divide
  function() {
    var args = Array.prototype.slice.call(arguments);
    return args.reduce(function(prv, cur, idx, ary) {
      return prv / cur;
    });
  }
});