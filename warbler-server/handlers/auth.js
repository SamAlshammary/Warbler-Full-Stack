const db = require("../models");
const jwt = require("jsonwebtoken"); //to create web tokens checking the user status if logged in or up


exports.signin = async function(req, res, next){

    try {
    //finding a user
    let user = await db.User.findOne({
        email: req.body.email
    });
    let {id, username, profileImageUrl} = user;
    //checking if their password matches what was sent to the server
    let isMatch = await user.comparePassword(req.body.password);
    //if it all matchers
    if(isMatch){
        let token = jwt.sign(
            {
            id,
            username,
            profileImageUrl
            },
            process.env.SECRET_KEY
     );
     //log them in
    return res.status(200).json({
        id,
        username,
        profileImageUrl,
        token
    });
}else {
    return next({
        status: 400,
        message: "Invalid Email/Password."
         });
    }
  }   catch (e) {
        return next({status: 400, message: "Invalid Email/Password."});
  }  
};

exports.signup = async function(req, res, next) {
    try{
        //create a user
        let user = await db.User.create(req.body);
        //create a token (signing a token)
        let {id, username, profileImageUrl} = user;
        let token = jwt.sign(
        {
            id,
            username,
            profileImageUrl
        }, 
        process.env.SECRET_KEY
        ); 
        // process.env.SECRET_KEY, to pass in some kind of secret key that is going to be the secret key that we load from our environment
        return res.status(200).json({
            id,
            username,
            profileImageUrl,
            token
        });
    } catch(err){
        //if a validation fails!
        //see what kind of error
        //if it is a certain error
        //respond with username/email already taken
        
        if(err.code === 11000){
            err.message = "Sorry, that username and/or email is taken";
        }
        //otherwise send back a generic 400
        return next({
            status: 400,
            message: err.message
        });
    }
};