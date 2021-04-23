const { jwtSecret } = require("../secret"); // use this secret!
const jwt = require("jsonwebtoken");

function tokenBuilder(user) {
  const payload = {
    subject: user.user_id,
    username: user.username,
    role_name: user.role_name,
  };
  const config = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, jwtSecret, config);
}

module.exports = {
  tokenBuilder,
};
