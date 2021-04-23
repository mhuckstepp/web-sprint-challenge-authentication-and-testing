const jwt = require("jsonwebtoken");
const { findByUsername } = require("../auth/auth-models");

const checkCredentials = (req, res, next) => {
  let credentials = req.body;
  console.log(credentials);
  if (
    !credentials.username ||
    !credentials.username.trim() ||
    !credentials.password
  ) {
    res.status(400).json("username and password required");
  }

  findByUsername(req.body.username)
    .then((user) => {
      if (!user) {
        next();
      } else {
        res.status(401).json("username taken");
      }
    })
    .catch(next);
};

const checkUsernameExists = (req, res, next) => {
  let credentials = req.body;
  if (
    !credentials.username ||
    !credentials.username.trim() ||
    !credentials.password ||
    !credentials.password.trim()
  ) {
    res.status(400).json("username and password required");
  }

  findByUsername(req.body.username)
    .then((user) => {
      if (user) {
        req.body.user = user;
        next();
      } else {
        res.status(401).json("invalid credentials");
      }
    })
    .catch(next);
};

module.exports = {
  checkCredentials,
  checkUsernameExists,
};
