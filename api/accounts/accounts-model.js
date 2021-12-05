const db = require("../../data/db-config");

const getAll = async () => {
  return await db("accounts").select("*");
}

const getById = async id => {
  return await db("accounts").select("*").where("id", id);
}

const create = async account => {
  return await db("accounts").insert(account);
}

const updateById = (id, account) => {
  // DO YOUR MAGIC
}

const deleteById = id => {
  // DO YOUR MAGIC
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
