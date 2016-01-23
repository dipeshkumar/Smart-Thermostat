var five = require("johnny-five");
var board = new five.Board();

//function call for PIR sensor..................
var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://thedidip%40gmail.com:9851200610@smtp.gmail.com');

// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'Smart Thermostat <thedidip@gmail.com>', // sender address
    to: 'dipesh009@gmail.com,upadesh.yadav@gmail.com,dhunganapragya@gmail.com,shivahari11@ncit.net.np', // list of receivers
    subject: 'Intruder Detected ', // Subject line
    text: 'Someone is stealing your Magic Pencil ', // plaintext body
    html: '<b>Someone is stealing your Magic Pencil</b>' // html body
};

// End of Function call for PIR Sensor................


var ws = require("nodejs-websocket");
// var ws = new WebSocket("ws://127.0.0.1:8081");
var connection = ws.connect('ws://192.168.0.106:8081');
var waitTimeOut = 0; // variable for wait for socket connection
var LAMP = 13,FAN = 10,HEATER = 12,TEST = 9;

var temperature = null;

board.on("ready", function(){
	initController();

  temperature = new five.Sensor({
    pin: "A0",
    //freq: 250
  });

  temperature.on("data",function(){
    var resultTemp = (this.value)/2;
    var query = {
        "origin":"johnnyFive",
        "destination":"server",
        "data":{
            "temperature":resultTemp
        }
    }
    // console.log(query);
    connection.sendText(JSON.stringify(query));
  });


   // Motion Sensor...........................................................

	// Create a new `motion` hardware instance.
  var motion = new five.IR.Motion(7);

  // "calibrated" occurs once, at the beginning of a session,
  motion.on("calibrated", function() {
    console.log("calibrated", Date.now());
  });

  // "motionstart" events are fired when the "calibrated"
  // proximal area is disrupted, generally by some form of movement
  motion.on("motionstart", function() {
    console.log("motionstart", Date.now());
// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});
// end of send mail ................
  });

  // "motionend" events are fired following a "motionstart" event
  // when no movement has occurred in X ms
  motion.on("motionend", function() {
    console.log("motionend", Date.now());
  });

//End of Motion Sensor...........................................................

	console.log("board is ready !");
});


function initController(){
	board.pinMode(LAMP, 1);
	board.pinMode(FAN, 1);
	board.pinMode(HEATER, 1);
	board.pinMode(TEST, 1);

	board.digitalWrite(LAMP,0);
	board.digitalWrite(FAN, 0);
	board.digitalWrite(HEATER, 0);
	board.digitalWrite(TEST, 1);
}


connection.on("text", function (message) {
    message = JSON.parse(message);
    
    if(message.destination == 'johnnyFive'){
      console.log(message);
      if(message.data.appliance == 'lamp'){
          if(message.data.cmd == 'on'){
            board.digitalWrite(LAMP,1);
            console.log("Lamp is on");
          } else{
            board.digitalWrite(LAMP,0);
            console.log("Lamp is off");
          }
      }

      else if(message.data.appliance == 'fan'){
        if(message.data.cmd == 'on'){
          board.digitalWrite(FAN,1);
          console.log("Fan is on");
        } else{
          board.digitalWrite(FAN,0);
          console.log("Fan is off");
        }
      }
       
      else if(message.data.appliance == 'heater'){
        if(message.data.cmd == 'on'){
          board.digitalWrite(HEATER,1);
          console.log("Heater is on");
        } else{
          board.digitalWrite(HEATER,0);
          console.log("Heater is off");
        }
      }
       
    }
});


