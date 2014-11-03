var fs = require('fs');
var filename = './nested_cbs.js';

fs.readFile(filename, function(err, data) {
  if (err)
    return console.error('Error reading the file:',filename+'\n' + 
        err.stack);
  var str = data.toString();
  str = str.replace(/var/g, 'banana');
  fs.writeFile(filename+'.new', str, function(err) {
    if (err)  return console.error(err.stack);
    console.log(filename+'.new written.');
  });
});
