var stubs = [
  { name: "ابدأ-رسم", params: ['w', 'h'] },
  { name: "خط", params: ['x1', 'y1', 'x2', 'y2'] },
  { name: "نقطة", params: ["x", "y"] },
  { name: "إهليلج", params: ["x", "y", "w", "h"] },
  { name: "دائرة", params: ["x", "y", "r"] },
  { name: "مستطيل", params: ["x", "y", "w", "h"] },
  { name: "مربع", params: ["x", "y", "s"] },
  { name: "ضجة", params: ["r", "g", "b"] },
  { name: "تحجيم", params: ["x", "y", "z"] },
  { name: "انزلاق", params: ["x", "y", "z"] },
  { name: "دوران", params: ["x", "y", "z"] },
  { name: "لون", params: ["r", "g", "b"] },
  { name: "خلفية", params: ["r", "g", "b"] }
]

var workerMethods = {}

stubs.forEach(function(m) {
  workerMethods[m.name] = function() {
    var data = {}
    for (var i = 0; i < m.params.length; i++)
      data[m.params[i]] = arguments[i];
    postMessage({type: "رسم:" + m.name, data: data})
  }
});

workerMethods["ارسم"] = function(fn) {
  setInterval(fn, 1000);
}

Qlb.globalEnvironment.merge(workerMethods);