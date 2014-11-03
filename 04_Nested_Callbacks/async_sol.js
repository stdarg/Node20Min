var fs = require('fs');
var filename = './async_sol.js';
var async = require('async');
async.waterfall([
  function(cb) {
    fs.readFile(filename, function(err, data) {
      if (err) return cb(err);
      var str = data.toString();
      str = str.replace(/var/g, 'banana');
      cb(null, str);
    });
  },
  function(fContents, cb) {
    fs.writeFile(filename+'.new', fContents, function(err) {
      if (err)  return cb(err);
      console.log(filename+'.new written.');
      cb();
    });
  }],
  function(err) {
    if (err) return console.error(err.stack);
    console.log('Done');
  }
);
