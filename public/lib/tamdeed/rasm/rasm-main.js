var canvas = document.createElement("canvas")
document.body.appendChild(canvas);

var Rasm = null;

interpreter["رسم:ابدأ-رسم"] = function(args) {
  Rasm = new Processing(canvas);
  Rasm.size(args.w, args.h); 
  Rasm.background(255, 255, 255)
}

interpreter["رسم:خط"] = function(args) {
  Rasm.line(args.x1, args.y1, args.x2, args.y2);
}

interpreter["رسم:نقطة"] = function(args) {
  Rasm.point(args.x, args.y);
}

interpreter["رسم:إهليلج"] = function(args) {
  Rasm.ellipse(args.x, args.y, args.w, args.h);
}

interpreter["رسم:دائرة"] = function(args) {
  Rasm.ellipse(args.x, args.y, args.r, args.r);
}

interpreter["رسم:مستطيل"] = function(args) {
  Rasm.rect(args.x, args.y, args.w, args.h);
}

interpreter["رسم:مربع"] = function(args) {
  Rasm.rect(args.x, args.y, args.s, args.s);
}

interpreter["رسم:ضجة"] = function(args) {
  Rasm.noise(args.r, args.g, args.b);
}

interpreter["رسم:تحجيم"] = function(args) {
  Rasm.scale(args.x, args.y, args.z);
}

interpreter["رسم:انزلاق"] = function(args) {
  Rasm.translate(args.x, args.y, args.z);
}

interpreter["رسم:دوران"] = function(args) {
  Rasm.rotate(args.x, args.y, args.z);
}

interpreter["رسم:لون"] = function(args) {
  Rasm.color(args.r, args.g, args.b);
}

interpreter["رسم:لون-الخط"] = function(args) {
  Rasm.stroke(args.r, args.g, args.b);
}

interpreter["رسم:خلفية"] = function(args) {
  Rasm.background(args.r, args.g, args.b);
}