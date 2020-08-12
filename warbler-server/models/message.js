const mongoose = require ("mongoose");
const User  = require("./user"); // importing the user model to make every message have a referencee to the user who created it.

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        maxlength: 160
    },
    user: { //make a reference to every user for that message   
        type: mongoose.Schema.Types.ObjectId,   //this is specifically just an object Id or unique identifier for some user. The important here is the below User model.
        ref: "User" 
    }
}, {
    timestamps: true    //This will add a (created at and updated at) for each individual document that the message schema creates. This will be really useful when we want to sort the messages.
});

messageSchema.pre('remove', async function(next){
    try{
    //find a user
        let user = await User.findById(this.user);
        //remove the id of the message from their messages list
            user.messages.remove(this.id);
                //save that user
                     await user.save(); 
                         //return next
                            return next();
    } catch(err){
        //if something went wrong
            return next(err);
    }
    //Note: this is important because we dont want a situation where we delete a message but a user still has that id of the message that could break things in our API!
})

const Message = mongoose.model('Message', messageSchema)
module.exports = Message;
