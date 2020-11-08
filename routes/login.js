var express = require("express");
var router = express.Router();

const login = require("../controllers/login");

let jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
let config = require("../config");

/* GET users listing. */
router.post("/", function (req, res, next) {
  let username = req.body.username;
  let password = req.body.password;

  // voy a la bd y consulto el usuario con el nombre username y obtengo la contraseña
  // se almacena el hash

  if (username && password) {
    let encrypted = CryptoJS.MD5(password).toString();
    console.log(encrypted);
    login.getPassword(username, (realPassword) => {
      if (!realPassword) {
        res.send({
          success: false,
          message: "User doesn't exist",
        });
      } else if (encrypted === realPassword) {
        console.log(realPassword);
        let token = jwt.sign({ username: username }, config.secret, {
          expiresIn: "24h",
        });
        login.updateToken(username, token);
        res.send({
          success: true,
          message: "Authentication successful",
          token: token,
        });
      } else {
        res.send({
          success: false,
          message: "Username or password not valid",
        });
      }
    });
  } else {
    res.send({
      success: false,
      message: "Username or password not supplied",
    });
  }
});

module.exports = router;
