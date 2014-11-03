var dgram = require('dgram');
var socket = dgram.createSocket('udp4');
var port = 4102;

socket.on('message', function (msg, rinfo) {
  console.log('received: ' + msg + ' from ' +
    rinfo.address + ':' + rinfo.port);
});

socket.bind(port, function() {
  socket.setBroadcast(true);
});

setInterval(function() {
  var msg = new Buffer('Hello world!');
  socket.send(msg, 0, msg.length, port, '255.255.255.255', function(err) {
    if (err) return console.error(err.stack);
  });
}, 1000);
