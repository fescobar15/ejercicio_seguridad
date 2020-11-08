const conn = require("../lib/mongoUtils");
const CryptoJS = require("crypto-js");

const sendClients = (req, res) =>
  conn.then((client) => {
    //Selección de la base de datos y collección
    client
      .db("db_jwt")
      .collection("Usuarios")
      .find({})
      .toArray((err, data) => {
        console.log(data);
        res.send(data);
      });
  });

const getRole = (token, callback) =>
  conn.then((client) => {
    client
      .db("db_jwt")
      .collection("Usuarios")
      .findOne({ token })
      .then((response) => {
        if (response) {
          callback(response.role);
        } else {
          callback(null);
        }
      });
  });

const createClient = (req, res) =>
  conn.then((client) => {
    //Construir nuevo cliente
    const newUser = {
      username: req.body.username,
      password: CryptoJS.MD5(req.body.password).toString(),
      email: req.body.email,
      role: req.body.role,
      token: "",
    };
    //Selección de la base de datos y collección
    client
      .db("db_jwt")
      .collection("Usuarios")
      .insertOne(newUser, (err, response) => {
        if (err) {
          res.send(err.message);
        } else {
          res.send(newUser);
        }
      });
  });

module.exports = { sendClients, getRole, createClient };
