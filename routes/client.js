var express = require("express");
var router = express.Router();

const middleware = require("../middleware");
const clients = require("../controllers/client");

//Get
router.get("/", middleware.checkTokenGet, clients.sendClients);

//Post
router.post("/", middleware.checkTokenPost, clients.createClient);

module.exports = router;
