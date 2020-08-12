const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); //bcrypet library used for password hashing

//setting up database user Schema 
const userSchema = new mongoose.Schema({
    email: {
    type: String,
    required: true,
    unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImageUrl:{
        type: String
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }]
});
//modifing the password from txt into hashing before saving the user details in the DB by using pre save hooks,
// async function to use the await keyword
userSchema.pre("save", async function(next){
    try{  
            if(!this.isModified("password")){
                return next();
            } //bcrypt.hash is not async function, thats why we use await keyword
             let hashedPaswword = await bcrypt.hash(this.password, 10);
             //once the above is finished
            this.password = hashedPaswword;
            return next();

    } catch(err){
        return next(err);
    }
} );

//helper function for the user to compare the hash password from the user and the DB password. the below all is async functions, so we need to tell express when to move on to the next piece of middleware
userSchema.methods.comparePassword = async function(candidatePassword, next){
    try{
        
        let isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;

    } catch(err){
        return next(err);
    }
};

//every single object from the above schema is going to be done through a model below.
const User = mongoose.model("User", userSchema);

module.exports = User;
