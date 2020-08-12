require("dotenv").config();
const jwt = require("jsonwebtoken");


//we need 2 function: 

//1- make suree the user is logged in - The idea of Authentication will be used here
 exports.loginRequired = function(req, res, next) {
    try{
         //try to get the token from each http header
     const token = req.headers.authorization.split(" ")[1];
        //decode that token
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){   //decoded or the convintion var name would be payload
            if(decoded){
                return next();
            } else {
                return next({
                    status: 401,
                    message: "Please log in first"
                });
            }
        })  
    } catch(err){
        return next({
                    status: 401,
                    message: "Please log in first"
        });
    }
 };   

//2- make sure we get the correct user - The idea of Authorization will be implemented here
exports.ensureCorrectUser = function(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
            if(decoded && decoded.id === req.params.id){
                return next();
            } else {
                return next({
                    status: 401,
                    message: "Unauthorized"
                });
            }
        });
    } catch(err){
        return next({status: 401, message: "Unauthorized"});
    }

};   
