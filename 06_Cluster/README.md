# Cluster

Just because JavaScript is single-threaded doesn't mean Node.js can't scale up to
take advantage of your computer's multiple CPUs.

Cluster is an elegant abstraction of the Unix fork/exec. A master process
creates the workers, and the listening socket, managed by the master,
sends the received responses to the workers.

## Hello World Using Cluster

```javascript
var cluster = require('cluster');
var http = require('http');

if (cluster.isMaster) {
  for (var i=0; i<3; i++)  cluster.fork();

  cluster.on('listening', function(worker, address) {
    console.log('Worker '+worker.id+
        ' is now listening on port', address.port);
  });
} else {
  http.createServer(function(req, res) {
    res.writeHead(200);
    res.end('Hello world from: '+cluster.worker.id+'\n');
  }).listen(8000);
}
```

This is the hello world example from the [http://nodejs.org](nodejs.org
website) with cluster. To run the program:

    $ node cluster.js
    Worker 1 is now listening on port 8000
    Worker 2 is now listening on port 8000
    Worker 3 is now listening on port 8000

To test the program from the command line:

    $ curl http://localhost:8000
    Hello world from: 3

## What's Happening?

Each time, the program calls `cluster.fork()` node
creates a child process. Additionally, there is the master process, which,
if any child process listens on a socket, the master process listens and then
dispatches the input to one of the children listening on the socket's port. The
children respond by sending the output back to the master process which
forwards it onto the socket in response.

