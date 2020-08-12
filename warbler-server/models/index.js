const mongoose = require ("mongoose");
mongoose.set("debug", true); //this is useful to see the actual Mongo queries that are being run in the terminal
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/warbler", {
    //setting up the connection to be stable.
    keepAlive: true

});


module.exports.User = require("./user");
module.exports.Message = require("./message");