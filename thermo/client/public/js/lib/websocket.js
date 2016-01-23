"use strict"

var ws = new WebSocket("ws://192.168.0.106:8081");

ws.onopen = function()
{
  console.log("Connection is made");
};



ws.onclose = function()
{
  console.log("Connection is closed...");
};

