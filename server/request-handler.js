/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var qs = require('querystring');
var objectId = 0;

var messages = [{username: 'anton', text: 'hello, humans!', objectId: objectId}];

var requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  //
  var defaultCorsHeaders = {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type, accept',
    'access-control-max-age': 10 // Seconds.
  };

  console.log('Serving request type ' + request.method + ' for url ' + request.url);


  var statusCode = 200;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'application/json';


  if (request.method === 'POST' && request.url === '/classes/messages') {
    var body = '';

    request.on('data', function(chunk) {
      chunk = JSON.parse(chunk);
      console.log("CHUNK =========>", chunk, typeof chunk);
      messages.results.push(chunk);
      console.log(messages);
    });

    request.on('end', function() {
      response.writeHead(201, headers);
      response.end(JSON.stringify(messages), {objectId: 1});
    });
  }

  if (request.method === 'GET' && request.url === '/classes/messages') {
    response.writeHead(200, headers);
    response.end(JSON.stringify(messages));
  }

  if (request.method === 'OPTIONS' && request.url === '/classes/messages') {
    response.writeHead(200, headers);
    response.end();
  }

  if (request.url !== '/classes/messages') {
    response.writeHead(404);
    response.end();
  }

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.

  //response.end();
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.

module.exports = requestHandler;


  // server
  //   1) should respond to GET requests for /classes/messages with a 200 status code
  //   2) should send back parsable stringified JSON
  //   3) should send back an object
  //   4) should send an object containing a `results` array
  //   5) should accept POST requests to /classes/messages
  //   6) should respond with messages that were previously posted
  //   7) Should 404 when asked for a nonexistent endpoint

  // Node Server Request Listener Function
  //   8) Should answer GET requests for /classes/messages with a 200 status code
  //   9) Should send back parsable stringified JSON
  //   10) Should send back an object
  //   11) Should send an object containing a `results` array
  //   12) Should accept posts to /classes/room
  //   13) Should respond with messages that were previously posted
  //   14) Should 404 when asked for a nonexistent file


