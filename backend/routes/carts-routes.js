const express = require('express');

const cartsControllers = require('../controllers/carts-controllers');

const router = express.Router();

router.post('/:uid/:pid', cartsControllers.putInCart);

router.delete('/:uid/:pid', cartsControllers.deleteFromCart);

router.delete('/:uid', cartsControllers.deleteAllFromCart);

module.exports = router;