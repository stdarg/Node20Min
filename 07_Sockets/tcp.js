var net = require('net');
var conn = {};
var server = net.createServer(function(c) {
  conn[c._handle.fd] = c;
  c.on('end', function() {
    delete conn[c._handle.fd];
  });
  c.on('data', function(buf) {
    for (var i in conn) {
      if (Number(i) !== c._handle.fd)
          conn[i].write(buf);
    }
  });
});
server.listen(3000);
