const db = require("../../data/dbConfig");

const add = async (user) => {
  let id = await db("users").insert(user);
  console.log(id);
  return findById(id);
};

const findByUsername = (username) => {
  return db("users as u").select("u.*").where("username", username).first();
};

const findById = (id) => {
  return db("users as u").select("u.*").where("id", id).first();
};

module.exports = {
  add,
  findByUsername,
};
