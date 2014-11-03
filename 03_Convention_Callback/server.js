var net = require('net');
var server = net.createServer(function(c) {
  c.write('hello world\r\n');
  c.pipe(c);
});
server.listen(8000, function() {
  console.log('server bound');
});
