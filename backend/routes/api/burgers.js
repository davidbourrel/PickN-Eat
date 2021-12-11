const express = require('express');
const router = express.Router();
const burgersController = require('../../controllers/burgers');

router
  .route('/')
  .get(burgersController.getAllBurgers)
  .post(burgersController.createBurger);

router
  .route('/:id')
  .get(burgersController.getBurger)
  .delete(burgersController.deleteBurger);

module.exports = router;
