require("dotenv").config(); //this to load all of our environment vaariables, process.env.____
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHanlder = require("./handlers/error");
const authRoutes = require("./routes/auth");
const messagesRoutes = require("./routes/messages");
const {loginRequired, ensureCorrectUser} = require("./middleware/auth");
const { db } = require("./models");
const PORT = 8081;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/users/:id/messages",
        loginRequired,
        ensureCorrectUser,
        messagesRoutes
                        );

//all my routes  - they will come later
app.get("/api/messages", loginRequired, async function(req, res, next){
    try{
        let messages = await db.Message.find()
        .sort({createdAt: "desc"})
        .populate("user", {
            username: true,
            profileImageUrl: true
        });
        return res.status(200).json(messages);
    } catch(err){
        next(err);
    }
})
//next, is an important callback function parameter,espically for error handling when we building the API, these type of functions called Handlers
app.use(function(req,res, next){
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});

//error handler
app.use(errorHanlder);


app.listen(PORT, function(){
    console.log(`Server is starting on port ${PORT}`);
});
