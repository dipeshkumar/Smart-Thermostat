
var fanOn = document.getElementById('fanOn');
var fanOff = document.getElementById('fanOff');
var lampOn = document.getElementById('lampOn');
var lampOff = document.getElementById('lampOff');
var heaterOn = document.getElementById('heaterOn');
var heaterOff = document.getElementById('heaterOff');
var temperatureValue = document.getElementById('temperature');

waitForSocketConnection(ws, function() {
    ws.onmessage = function(message){
        message = JSON.parse(message.data);
        if(message.destination == 'interface'){

            updateUI(message.data.temperature);
        }
    }
});
        
function updateUI(value){
    temperatureValue.innerHTML = value + '&#186;C';
}


var waitTimeOut = 0;

function waitForSocketConnection(socket, callback) {

    setTimeout(
        function() {
            waitTimeOut = waitTimeOut + 1;
            if (waitTimeOut === parseInt(3)) {
                waitTimeOut = 0;
                return;
            }

            if (socket.readyState === 1) {
                console.log("Connection is made")
                if (callback != null) {
                    callback();
                }
                return;
            } else {
                console.log("wait for connection...")
                waitForSocketConnection(socket, callback);
            }

        }, 1000); // wait 1 second for the connection...
}

lampOn.onclick = function(e) {
    e.preventDefault();
    var query = {
        "origin":"interface",
        "destination":"server",
        "data":{
            "appliance":"lamp",
            "cmd":"on"
        }
    };
    waitForSocketConnection(ws, function() {
        ws.send(JSON.stringify(query));
    });
}

lampOff.onclick = function(e) {
    e.preventDefault();
    var query = {
        "origin":"interface",
        "destination":"server",
        "data":{
            "appliance":"lamp",
            "cmd":"off"
        }
    };
    waitForSocketConnection(ws, function() {
        ws.send(JSON.stringify(query));
    });
}

fanOn.onclick = function(e) {
    e.preventDefault();
    var query = {
        "origin":"interface",
        "destination":"server",
        "data":{
            "appliance":"fan",
            "cmd":"on"
        }
    };
    waitForSocketConnection(ws, function() {
        ws.send(JSON.stringify(query));
    });
}
fanOff.onclick = function(e) {
    e.preventDefault();
    var query = {
        "origin":"interface",
        "destination":"server",
        "data":{
            "appliance":"fan",
            "cmd":"off"
        }
    };
    waitForSocketConnection(ws, function() {
        ws.send(JSON.stringify(query));
    });
}

heaterOn.onclick = function(e) {
    e.preventDefault();
    var query = {
        "origin":"interface",
        "destination":"server",
        "data":{
            "appliance":"heater",
            "cmd":"on"
        }
    };
    waitForSocketConnection(ws, function() {
        ws.send(JSON.stringify(query));
    });
}

heaterOff.onclick = function(e) {
    e.preventDefault();
    var query = {
        "origin":"interface",
        "destination":"server",
        "data":{
            "appliance":"heater",
            "cmd":"off"
        }
    };
    waitForSocketConnection(ws, function() {
        ws.send(JSON.stringify(query));
    });
}
