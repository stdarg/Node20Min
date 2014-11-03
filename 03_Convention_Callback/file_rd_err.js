var fs = require('fs');
fs.readFile('/etc/no.such.file', function (err, data) {
  if (err) throw err;
  console.log(data.toString());
});
