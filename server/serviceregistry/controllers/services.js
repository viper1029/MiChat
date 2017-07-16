'use strict';

var http = require('http');

var services = {};

function cleanServices() {
	for (var name in services) {
		if (services.hasOwnProperty(name)) {
			if (services[name] == null) {
				services[name] = [];
			}

			var copyArr = services[name].slice();
			var currentTime = new Date();

			for (var i = copyArr.length - 1; i >= 0; i--) {
				var diff = currentTime - new Date(copyArr[i].inserttime);
				if (diff > 5000) {
					//console.log(JSON.stringify(services[name][i]));
					services[name].splice(i, 1);
				}
			}
		}
		// console.log(JSON.stringify(services[name]));
	}
	setTimeout(cleanServices, 5000);
};

cleanServices();

exports.find = (req, res) => {
  var name = req.param('name');

  if (services[name] != null && services[name].length != 0) {
    res.json({
      location: services[name].slice(-1)[0]
    });
  }
  else {
    res.json({
      message: "no service online"
    });
  }
};

exports.add = (req, res) => {
  // microservice
  // repond
  var name = req.body.name;
  var host = req.body.host;
  var port = req.body.port;
  
  if (services[name] == null) {
	services[name] = [];
  }

  var location = {
    "name": name,
    "host": host,
    "port": port,
    "inserttime": new Date()
  }

  services[name].push(location);
  //console.log("added to " + name + " " + JSON.stringify(services[name]));
  res.json({
    message: 'added services'
  });
};

exports.remove = (req, res) => {
  // microservice
  // repond
  var name = req.body.name;
  var location = req.body.location;
  //  services[name].push(location);
  res.json({
    message: 'added services'
  });
};



