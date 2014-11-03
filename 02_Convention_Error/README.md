# Convention - Error First

Having the error first in a callback is a convention. Node.js is 100% strict
about this in its own interfaces, but it's a clear way to communicate failure in
an asynchronous function. It's a friendly prompt to handle your error as the first
thing you do in your callback.

## File Move Example

```javascript
var fs = require('fs');
fs.rename('/tmp/hello', '/tmp/world', function (err) {
  if (err) throw err;
  console.log('renamed complete');
});
```

The previous example shows the `fs.rename` callback with one argument, an error.
Though the error is thrown, you send an error to a log file, standard error, do
nothing or whatever makes sense for your application.

## File Read Example

```javascript
var fs = require('fs');
fs.readFile('/etc/no.such.file', function (err, data) {
  if (err) throw err;
  console.log(data.toString());
});
```

Again, the `fs` module, but with `readFile`. Here, the error is only defined where
the read failed.


