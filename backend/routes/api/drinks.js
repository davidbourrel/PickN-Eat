const express = require('express');
const router = express.Router();
const drinksController = require('../../controllers/drinks');

router.route('/').get(drinksController.getAllDrinks);

router
  .route('/:id')
  .get(drinksController.getDrink)
  .delete(drinksController.deleteDrink);

module.exports = router;
