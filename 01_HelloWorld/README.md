# Hello World

Here is the hello world example for Node.js from the [Node.js](http://nodejs.org/) website.

To run this example, just type at the command line:

    $ node hello.js

To test this server, type, from the command line:

    $ curl http://127.0.0.1:1337/

## What's Going On?

1. The http module is loaded via require loading the http varible with the
   module's exports.
2. The exported `createServer` function on the http object is called.
    1. The argument to the `createServer` function is a callback.
    2. Node calls callback upon every new connection with a request and response
        object.
    3. In the callback, we:
        1. set the header to text plain
        2. Return the text body with 'Hello World\n' (the HTTP status is
           implicitly 200).
3. The `createServer` function returns a server object and we use that object to
   invoke its listen function, instructing it to listen on port 1337 bound to
   the localhost interface.

