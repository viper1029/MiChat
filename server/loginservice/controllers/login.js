'use strict';


exports.login = (req, res) => {
  var userName = req.param('userName');
  var password = req.param('password');
  //console.log("login from microservice");
  console.log(userName + " " + password);
 // console.log(req);
  if(password === 'password'){
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


