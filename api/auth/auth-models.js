const db = require("../../data/dbConfig");

const add = async (user) => {
  let [id] = await db("users").insert(user);
  return findByUsername(id);
};

const findByUsername = (username) => {
  return db("users as u").select("u.*").where("username", username).first();
};

module.exports = {
  add,
  findByUsername,
};
