// The hello world example from the http://node.js.org/ website.

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

    // collect the body
    req.on('data', function (data) {
      body += data.toString();
    });

    // we have the body & header, now process.
    req.on('end', function () {
        req.body = body;
        cb(undefined, body);
    });
}
