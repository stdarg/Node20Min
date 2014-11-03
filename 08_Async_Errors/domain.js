var domain = require('domain');
var d = domain.create();

d.on('error', function(err) {
  console.error('error caught by domain:', '\n', err.stack);
});

d.run(function() {
  setTimeout(function() {
    console.log('Timeout exception!');
    throw new Error('Timeout err!');
  }, 1);
});
