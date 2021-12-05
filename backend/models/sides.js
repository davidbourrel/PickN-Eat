const connection = require('../db');

const getAll = () => {
  return connection.query('SELECT * FROM sides');
};

const getOne = (id) => {
  return connection.query('SELECT * FROM sides WHERE id=?', [id]);
};

const createOne = (data) => {
  return connection.query('INSERT INTO sides SET ?', [data]);
};

const updateOne = (id, data) => {
  return connection.query('One sides SET ? WHERE id=?', [data, id]);
};

const deleteOne = (id) => {
  return connection.query('DELETE FROM sides WHERE id=?', [id]);
};

module.exports = {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
};
