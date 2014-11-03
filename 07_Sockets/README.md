# Sockets

Beyond supporting HTTP/HTTPS, Node.js has support for TCP and UDP sockets. Like
every other feature in Node.js they're designed around asynchronous I/O.


## A Chat Server using TCP

```javascript
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
```

The TCP example program illusrates a chat server. To run the server type, at the
command prompt:

    $ node tcp.js

Then, to "talk", you can use telnet at the command prompt:

    $ telnet localhost 3000

How does it work? We call `createServer` with a connection listener callback.
After every client connect to the server a connected socket is the parameter to
the callback. When we receive the socket, we set up an `end` event to handle
ungraceful disconnects and a `data` event for input. Once we receive data, we forward
that input to every other socket connection.

## Hello World using UDP

```javascript
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
```

The UDP example shows how an application using UDP is neither client nor server.
It's just a set of peers. Here, we create the UDP socket, handle `message`
(input) events, then bind the port to listen and, once bound, set the socket to
broadcast.

Then, every second, we send "Hello world!" to the broadcast address
(255.255.255.255).
