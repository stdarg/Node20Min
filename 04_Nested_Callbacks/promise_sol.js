var filename = './promise_sol.js';
var promise = require('bluebird');
var fs = require('fs');
promise.promisifyAll(fs);

fs.readFileAsync(filename)
.then(function(data) {
  var str = data.toString();
  str = str.replace(/var/g, 'banana');
  return str;
})
.then(function(str) {
  return fs.writeFileAsync(filename+'.new', str);
})
.catch(function(err) {
  return console.error('File Error:',filename+'\n' + err.stack);
})
.done(function() { console.log('done!'); });
