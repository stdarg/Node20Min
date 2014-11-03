# Async Errors

Node.js being designed around asynchronous I/O had an achilles heel around error
handling and asynchronous errors. Specifically with exceptions thrown in
callbacks.


## Try/Catch Doesn't Always Work

```javascript
try {
  setTimeout(function() {
    console.log('Timeout!');
    throw new Error('Timeout err!');
  }, 1);
} catch(err) {
  console.log('We will never see this.');
}
```

The previous code sample shows an exception being thrown in an asynchronous
callback. The catch clause will always fail to pick up the exception, because
the async callback has a different thread of execution that's not related to the
try/catch.

In a complex program dealing with a large amount of asynchronous input and
output, this could be difficult.


## Node.js Domains Catch Async Errors

```javascript
var domain = require('domain');
var d = domain.create();

d.once('error', function(err) {
  console.error('error caught by domain:', '\n', err.stack);
  process.exit(1);
});

d.run(function() {
  setTimeout(function() {
    console.log('Timeout exception!');
    throw new Error('Timeout err!');
  }, 1);
});
```

This is a simplified example of a domain error handler. Here, we create the
domain and the, create an event listener that will listen for the `error` event
(only once), display the error and then exit with the error code '1'.
