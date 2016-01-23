

var ws = require("nodejs-websocket");

var websocketPort = 8081;

var express = require('express');
var app = express();
app.use(express.static('../client/public'));

app.listen(3000);



var server = ws.createServer(function (conn) {
    conn.on('text', function(message) {
        message = JSON.parse(message);
        if(message.destination == 'server'){
            if(message.origin == 'johnnyFive'){
                processJohnyFive(message);
            }
            else if(message.origin == 'interface'){
                processInterface(message);

            }
        }

    });    
});

server.listen(websocketPort);

function processJohnyFive(message){    
    message.destination = 'interface';
    broadcast(message);
}


function processInterface(message){
    message.destination = 'johnnyFive';
    broadcast(message);
}


function broadcast(msg) {
    server.connections.forEach(function (conn) {
        if(typeof(msg) != "string") {
            msg = JSON.stringify(msg);        
        }
        conn.sendText(msg);
        //logger.info(msg,{timestamp:Date.now()});
    });
}


