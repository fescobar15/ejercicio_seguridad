const jwt = require("jsonwebtoken");
const config = require("./config");
const client = require("./controllers/client");

const checkTokenGet = (req, res, next) => {
  let token = req.headers["x-acces-token"] || req.headers["authorization"];

  if (token) {
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
      jwt.verify(token, config.secret, (err, decoded) => {
        //Si hay error
        if (err) {
          return res.json({
            success: false,
            message: "Token is not valid",
          });
          //Si el token es valido
        } else {
          req.decoded = decoded;
          // token -> user al que se le generó el token
          // ir a la bd y verificar que user tenga acceso a /api/clients
          client.getRole(token, (role) => {
            if (role) {
              if (role === "admin" || role === "read") {
                next();
              } else {
                res.send({
                  success: false,
                  message:
                    "The user does not have the permission to access this resource",
                });
              }
            } else {
              res.send({
                success: false,
                message: "The user with the token provided doesn't exist",
              });
            }
          });
        }
      });
    }
  } else {
    res.send({
      success: false,
      message: "Auth token was not supplied",
    });
  }
};

// Post
const checkTokenPost = (req, res, next) => {
  let token = req.headers["x-acces-token"] || req.headers["authorization"];

  if (token) {
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
      jwt.verify(token, config.secret, (err, decoded) => {
        //Si hay error
        if (err) {
          return res.json({
            success: false,
            message: "Token is not valid",
          });
          //Si el token es valido
        } else {
          req.decoded = decoded;
          // token -> user al que se le generó el token
          // ir a la bd y verificar que user tenga acceso a /api/clients
          client.getRole(token, (role) => {
            if (role) {
              if (role === "admin" || role === "modify") {
                next();
              } else {
                res.send({
                  success: false,
                  message:
                    "The user does not have the permission to access this resource",
                });
              }
            } else {
              res.send({
                success: false,
                message: "The user with the token provided doesn't exist",
              });
            }
          });
        }
      });
    }
  } else {
    res.send({
      success: false,
      message: "Auth token was not supplied",
    });
  }
};

module.exports = { checkTokenGet, checkTokenPost };
