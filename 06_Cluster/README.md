# Cluster

Because JavaScript is single-threaded, doesn't mean Node.js can't scale up to
take advantage of your computer's multiple CPUs.

Cluster is a simplified abstraction of Unix's fork/exec. Where a master process
typically creates the workers and the listening socket, managed by the master,
sends the received data to the workers.


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
website). However, this time we read the body of the request using streaming
events. The HTTP request object is an input stream with the usual input stream
events.

In the function getBody(), we accumulate the body text using the 'data' event
and, once the 'end' event arrives, we know we have the entire message body.

To run this, first start the node server:

    $ node hello_world_stream.js

Then, using curl, send a POST request with a body:

    $ curl -i -H "X-HTTP-Method-Override: PUT" -X POST -d "value":"30","type":"Tip 3","targetModule":"Target 3","version":0,"systemId":3,"active":true  http://localhost:1337/

