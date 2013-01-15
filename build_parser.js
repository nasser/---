var PEG = require('pegjs'),
    path = require('path'),
    fs  = require('fs');

var QLB_PARSER = 'Qlb.parser';

var source = QLB_PARSER + ' = ' + PEG.buildParser(
  fs.readFileSync(
    path.join('peg', 'qlb.peg')
  ).toString()
).toSource() + ';';

fs.writeFileSync(
  path.join('public/qlb/parser.js'),
  source
);
