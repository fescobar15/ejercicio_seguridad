const conn = require("../lib/mongoUtils");

const getPassword = (username, callback) =>
  conn.then((client) => {
    //Selección de la base de datos y collección
    client
      .db("db_jwt")
      .collection("Usuarios")
      .findOne({ username })
      .then((result) => {
        if (result) {
          callback(result.password);
        } else {
          callback(null);
        }
      });
  });

const updateToken = (username, token) => {
  conn.then((client) => {
    client
      .db("db_jwt")
      .collection("Usuarios")
      .updateOne({ username }, { $set: { token } });
  });
};

module.exports = { getPassword, updateToken };
