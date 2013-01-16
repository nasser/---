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

  "كرر":
  function(n, fn) {
    for (var i = 0; i < n; i++) { fn(n); }
  },

  "عكس":
  function(l) {
    return l.reverse();
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

  "طبق-مع-مؤشر":    // map-with-index
  function(fn, lst) {
    var ary = [];
    for (var i = 0; i < lst.length; i++) {
      ary[i] = fn(lst[i], i)
    }
    return ary;
  },

  "أجل":
  function(fn, millis) {
    return window.setTimeout(fn, millis)
  },

  "عنصر":
  function(n, lst) {
    console.log(lst.length, n, lst)
    return n < 1 || n > lst.length ? 0 : lst[n-1];
  },

  // input/output

  "قول":    // say
  function(str) {
    Qlb.console.log(str);
    return str;
  },

  "ضمن":    // require
  function(url) {
    var code = Qlb.http.get("/lib/" + url.replace("\\", "/") + ".qlb");
    return Qlb.execute(code);
  },

  "ضمن-تمديد":    // require-extension
  function(url) {
    importScripts("/lib/tamdeed/" + url + "-worker.js");
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