
var db = require('../db');


exports.sendMessage = (req, res) => {
  // microservice
  // repond
  var user = req.body.user;
  var message = req.body.message;
  if (!user || !message) {
	res.json({message: "invalid user or message"});
  }
  else {
    db.sendMessage(user,message);

    res.json({
	  message: 'messagerecieved'
    });
  }
  
};

exports.getMessages = (req, res) => {
  // microservice
  // repond
  var callback = function (data) {
    console.log(data);
    res.json({
      data
    });
  }

  var messages = db.getMessages("asdf", callback);

};

exports.listOfRooms = (req, res) => {
  // look in db for list of rooms - hardcoded
  res.json({
    roomList: ["DDX", "ZEMA", "DM", "Support", "Data Delivery"]
  });
};