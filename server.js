

var express = require('express');
var http = require('http');
var websocket = require('websocket').server;
var app = express();

var port = process.env.PORT || 3000;
app.set('view engine', 'ejs');

var server = http.createServer(app);
server.listen(port);

function log(msg){
 console.log((new Date()) + ' ' + msg);
}

server.on('listening', function(){
 log("Listeing port " + port);
 log("In your browser open http://127.0.0.1:" + port);
});

var wsServer = new websocket({
  httpServer: server,
  autoAcceptConnections: false
});
wsServer.on('request', function(request) {
  var connection = request.accept('echo-protocol', request.origin);

  log('Connection accepted.');
  connection.on('message', function(message) {

    if (message.type === 'utf8') {
      log('Received Message: ' + message.utf8Data);
      connection.sendUTF("Hello, I'am fine, Thank you");
    }
  });

  connection.on('close', function(reasonCode, description) {
    log('Peer '+ connection.remoteAddress + ' disconnected.');
  });
});

app.get('/',function(req,res)
{
    res.sendFile(__dirname+'/Client.html');
});
