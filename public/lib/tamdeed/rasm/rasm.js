var canvas = document.createElement("canvas")
document.body.appendChild(canvas);

var Rasm = null;

Qlb.globalEnvironment.merge({
  "ابدأ-رسم":
  function(w, h) {
    Rasm = new Processing(canvas);
    Rasm.size(w, h); 
    Rasm.background(255, 255, 255)

    // console.log(Rasm)
  },

  "ارسم":
  function(fn) {
    Rasm.draw = fn;

    Rasm.background(255, 255, 255);
    Rasm.loop()
  },

  "خط":
  function(x1, y1, x2, y2) {
    Rasm.line(x1, y1, x2, y2);
  },

  "خط":
  function(x1, y1, x2, y2) {
    Rasm.line(x1, y1, x2, y2);
  },

  "نقطة":
  function(x, y) {
    Rasm.point(x, y);
  },

  "إهليلج":
  function(x, y, w, h) {
    Rasm.ellipse(x, y, w, h);
  },

  "دائرة":
  function(x, y, r) {
    Rasm.ellipse(x, y, r, r);
  },

  "مستطيل":
  function(x, y, w, h) {
    Rasm.rect(x, y, w, h);
  },

  "مربع":
  function(x, y, s) {
    Rasm.rect(x, y, s, s);
  },

  "ضجة":
  function(r, g, b) {
    Rasm.noise(r, g, b);
  },

  "تحجيم":
  function(x, y, z) {
    Rasm.scale(x, y, z);
  },

  "انزلاق":
  function(x, y, z) {
    Rasm.translate(x, y, z);
  },

  "دوران":
  function(x, y, z) {
    Rasm.rotate(x, y, z);
  },

  "لون":
  function(r, g, b) {
    Rasm.color(r, g, b);
  },

  "خلفية":
  function(r, g, b) {
    Rasm.background(r, g, b);
  }
});