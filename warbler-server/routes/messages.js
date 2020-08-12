const express = require('express');
const router = express.Router({mergeParams: true}); //mergeParams allows us to get access to the id inside of this router.

const {
    createMessage, 
    getMessage, 
    deleteMessage 
    } = require("../handlers/messages");

//instead of using router.get or router.post because i want to make sure that all of our routes stat with just a( / ) because we are going to prefix all of these routes with (/api/users/:id/messges)
//prefix - /api/users/:id/messages
router.route("/").post(createMessage);

//prefix - /api/users/:id/messages/:message_id
router
    .route("/:message_id")
    .get(getMessage)
    .delete(deleteMessage);

module.exports = router;