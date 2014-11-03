# Streams

Streams are powerful and efficient. This is just an introduction to streams. I
suggest that, if you are serious about Node.js, to take a few hours and acquaint
yourself with the power of what streams can do.

## Hello World Using Req Stream

```javascript
var http = require('http');

http.createServer(function (req, res) {
  getBody(req, function(err, body) {
    if (err) throw err;
    console.log('Body: '+body);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
  });
}).listen(1337, '127.0.0.1', function() {
  console.log('Server running at http://127.0.0.1:1337/');
});

function getBody(req, cb) {
  var body = '';

  // collect the body in buf;
  req.on('data', function (data) { body += data.toString(); });

  // we have the body & header, now process.
  req.on('end', function () {
    req.body = body;
    cb(null, body);
  });
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


