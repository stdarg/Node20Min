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
