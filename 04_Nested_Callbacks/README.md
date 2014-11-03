# Nested Callbacks

Guaranteeing the order of operations in asynchronous can lead developers to nest asynchronous functions. When one asynchronous function completes, place the next step in the callback and so on. This works on a limited scale, but once you have many steps (imagine 10 or more), the code becomes confusing to look at. Below is an example of nested callbacks to ensure order of operation:

```javascript
var fs = require('fs');
var filename = './nested_cbs.js';

fs.readFile(filename, function(err, data) {
  if (err)
    return console.error('Error reading the file:',filename+'\n' + 
        err.stack);
  var str = data.toString();
  str = str.replace(/var/g, 'banana');
  fs.writeFile(filename+'.new', str, function(err) {
    if (err)  return console.error(err.stack);
    console.log(filename+'.new written.');
  });
});
```

The file is asynchronously read, its contents changed and then is written. Again, imagine if you had a dozen steps ordered this way.  The solution is to a control flow library and the options use either callbacks or promises. Which is as devisive as tabs versus spaces or emacs versus vi.

## Control flow with the async module

```javascript
var fs = require('fs');
var filename = './async_sol.js';
var async = require('async');
async.waterfall([
  function(cb) {
    fs.readFile(filename, function(err, data) {
      if (err) return cb(err);
      var str = data.toString();
      str = str.replace(/var/g, 'banana');
      cb(null, str);
    });
  },
  function(fContents, cb) {
    fs.writeFile(filename+'.new', fContents, function(err) {
      if (err)  return cb(err);
      console.log(filename+'.new written.');
      cb();
    });
  }],
  function(err) {
    if (err) return console.error(err.stack);
    console.log('Done');
  }
);
```

The above code solves the same problem as the initial code, but uses the async module. Here, the waterfall method takes the output of one step and passes it as the input to the next step. The steps are done sequentially and passed in an array.

It works, won't result in callback hell (many nested callbacks), but the async module is hard to understand at first. It's powerful, but when you first see it, it can be confusing.

## Control flow with promises

An alternative form of control is promises. The two most popular promise libraries are q and bluebird. Here, I use bluebird to solve the same problem:

```javascript
var filename = './promise_sol.js';
var promise = require('bluebird');
var fs = require('fs');
promise.promisifyAll(fs);

fs.readFileAsync(filename)
.then(function(data) {
  var str = data.toString();
  str = str.replace(/var/g, 'banana');
  return str;
})
.then(function(str) {
  return fs.writeFileAsync(filename+'.new', str);
})
.catch(function(err) {
  return console.error('File Error:',filename+'\n' + err.stack);
})
.done(function() { console.log('done!'); });
```

The trick, or minor drawback with promises is that Node.js does not support promises. Here, bluebird wraps each method is the fs module with a promise. Then, the example uses the promisified versions of the fs functions. Though I'm biased towards async, I have to acknowlege the elegance of promises.
