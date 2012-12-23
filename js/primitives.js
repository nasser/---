Qlb.globalEnvironment.merge({
  // general

  "رأس":    // head
  function(x) {
    return x[0];
  },

  "ذيل":    // tail
  function(x) {
    return x.slice(1);
  },

  "كينس":    // cons
  function(x, y) {
    return [x].concat(y)
  },

  "كينس":    // cons
  function(x, y) {
    return [x].concat(y)
  },

  "و":    // and
  function(x, y) {
    var args = Array.prototype.slice.call(arguments);
    return args.reduce(function(prv, cur, idx, ary) {
      if(idx > 0) return prv && !!cur;
      else return !!cur;
    });
  },

  "أو":    // or
  function(x, y) {
    var args = Array.prototype.slice.call(arguments);
    return args.reduce(function(prv, cur, idx, ary) {
      if(idx > 0) return prv || !!cur;
      else return !!cur;
    });
  },

  // input/output

  "قول":    // say
  function(str) {
    Qlb.console.log(str);
    return str;
  },

  "ضمن":    // require
  function(url) {
      jx.load("/lib/" + url + ".قلب", function(code) {
      return Qlb.execute(code);
    }, function(error) {
      Qlb.console.warn("خطأ: نص '" + url + "' غير موجود");
    }, false);
  },

  // comparison
   
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

  "ضرب":     // divide
  function() {
    var args = Array.prototype.slice.call(arguments);
    return args.reduce(function(prv, cur, idx, ary) {
      return prv / cur;
    });
  }
});