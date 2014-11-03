# Convention - Callback Last

Having the callback last is convenient when you have a small callback with a few
lines and an anonymous function will suffice. Of course, if nested more than a
few times, your code will be hard to read. But it's a convention you should
adhere to.

## File Read Example

```javascript
var fs = require('fs');
fs.readFile('/etc/no.such.file', function (err, data) {
  if (err) throw err;
  console.log(data.toString());
});
```

Again, the readFile example with the callback as the last argument to the
readFile function.

## Server Example

```javascript
var net = require('net');
var server = net.createServer(function(c) {
  c.write('hello world\r\n');
  c.pipe(c);
});
server.listen(8000, function() {
  console.log('server bound');
});
```

Here, we create a TCP echo server. In the createServer and the listen function,
the callback is the last (and in the example, the only) paramater. 

