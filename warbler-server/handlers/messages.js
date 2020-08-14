const db = require("../models");

exports.createMessage = async function(req, res, next) {
    try {
      let message = await db.Message.create({ //make a new message
        text: req.body.text, //to create messages we have to pass in some text and some user
        user: req.params.id
      });
      let foundUser = await db.User.findById(req.params.id); //finding that specific user by id so we can add aproperty into that user => the message to user messages
      foundUser.messages.push(message.id);
      await foundUser.save(); //save that user ,after saving that user, we can send back the message with that user's data as well
      let foundMessage = await db.Message.findById(message._id).populate("user", { //populating this is instead of just getting the id of that user from the message.js user object, i want to get some properties about that usere when i send this back =>
        //this is goinng to allow my API to create a message aand send me back that message immediately with the username; and the image of the user at the same time, so we dont have to query it with different request.
        username: true,
        profileImageUrl: true
      });
      return res.status(200).json(foundMessage);
    } catch (err) {
      return next(err);
    }
  };

// GET api/users/:id/messages/:message_id
//this is useful to get indivdual message for maybe editing ... 
exports.getMessage = async function(req, res, next) {
    try {
      let message = await db.Message.find(req.params.message_id);
      return res.status(200).json(message);
    } catch (err) {
      return next(err);
    }
  };
  

//DELETE api/users/:id/messages/:message_id
exports.deleteMessage = async function(req, res, next) {
    try {
      let foundMessage = await db.Message.findById(req.params.message_id);
      await foundMessage.remove();
  
      return res.status(200).json(foundMessage);
    } catch (err) {
      return next(err);
    }
  };
  