"use strict"

var template = {

	load: function(file) {
		var path = "ui/" + file + ".html";

		this.__file(function(response) {
			document.body.innerHTML = '';
			var js = template.createScript(file);
			var css = template.createStyle(file);

			document.body.innerHTML = response;
			document.body.appendChild(css);
        	document.body.appendChild(js);
   		},path);
	},

	__file: function (callback,path) {
	    var xobj = new XMLHttpRequest();

	    xobj.open('GET', path, true);

	    xobj.setRequestHeader("pragma", "no-cache");
	    xobj.setRequestHeader("cache-control", "no-store, must-revalidate, private");

	    xobj.onreadystatechange = function() {
	        if (xobj.readyState == 4 && xobj.status == "200") {
	            callback(xobj.responseText);
	        }
	    };
    	xobj.send(null);
	},

	createScript: function (scriptName) {
		var script = document.createElement('script');
		script.src = "js/" + scriptName + ".js";
		return script;
	},

	createStyle: function (stylePath) {
		var link = document.createElement('link');
		link.rel = "stylesheet";
		link.href = "css/" + stylePath + ".css";
		return link;
	},

	require: function(scriptName,callback) {
		var path = "js/" + scriptName + ".js";
		this.__file(function(response){
			var js = template.createScript(scriptName);
			js.innerHTML = response;
			document.body.appendChild(js);
			callback();
		},path); 
	}
}