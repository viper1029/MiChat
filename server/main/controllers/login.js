'use strict';
  var http = require('http');


exports.login = (req, res) => {
  var userName = req.body.userName;
  var password = req.body.password;
  console.log(userName + "  "+ password);
  
  var callback = function(obj) {
	res.json(obj);
  };
  findLoginService(callback, userName, password);
};

exports.login = (req, res) => {
  var userName = req.body.userName;
  var password = req.body.password;
  console.log(userName + "  "+ password);

  if(userName === 'admin' && password === 'password'){
    res.json( {
    userid: userName
  });
  }else {
     res.json( {
    message: 'please specify valid credentials'
  });
  }
};

exports.listOfRooms = (req, res) => {
  // look in db for list of rooms - hardcoded
  res.json( {
    roomList: [1, 2, 3, 4]
  });
};

exports.roomInfo = (req, res) => {
  // request contains roomId, look up in db for room info
  res.json( {
    roomName: "test"
  });
};


