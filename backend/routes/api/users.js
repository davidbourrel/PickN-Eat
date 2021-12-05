const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/users');

router
  .route('/:id')
  .get(usersController.getUser)
  .put(usersController.updateUser)
  .delete(usersController.deleteUser);

module.exports = router;
