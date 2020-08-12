const db = require("../models");


exports.createMessage = async function(req, res, next){
    try{
        //make a new message
        let message = await db.Message.create({
            //to create messages we have to pass in some text and some user
            text: req.body.text,
            user: req.params.id
        });
        //finding that specific user by id so we can add aproperty into that user => the message to user messages
        let foundUser = await db.User.findById(req.params.id);
        foundUser.messages.push(message.id);
        //save that user
        await foundUser.save()
        // after saving that user, we can send back the message with that user's data as well
        let foundMessage = await db.Message.findById(message._id).populate("user", { //populating this is instead of just getting the id of that user from the message.js user object, i want to get some properties about that usere when i send this back =>
            //this is goinng to allow my API to create a message aand send me back that message immediately with the username; and the image of the user at the same time, so we dont have to query it with different request.
            username: true,
            profileImageUrl: true
        });
        return res.status(200).json(foundMessage);
    }catch(err){
        return next(err);
    }   
};

// GET api/users/:id/messages/:message_id
exports.getMessage = async function(req, res, next){ //this is useful to get indivdual message for maybe editing ... 
try{    
        let message = await db.Message.find(req.params.message_id);
        return res.status(200).json(message);
}catch(err){
    return next(err)
}

};  

//DELETE api/users/:id/messages/:message_id
exports.deleteMessage = async function(req, res, next){
    try{
        let foundMessage = await db.Message.findById(req.params.message_id);    //we cannnot use findByIdAndRemove as we are using pre remove hook in the message.js handlers
        await foundMessage.remove();

        return res.status(200).json(foundMessage);

    }catch (err){
        next(err);

    }
};