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
  return null;
}

const deleteById = async id => {
  return await db("accounts").where("id", id).del();
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
