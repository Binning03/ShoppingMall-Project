const express = require('express');
const { check } = require('express-validator');

const usersControllers = require('../controllers/users-controllers');

const router = express.Router();

router.get('/:uid', usersControllers.getUser);

router.post(
  '/signup',
  [
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 }),
    check('repeatpassword').isLength({ min: 6 }),
    check('address').not().isEmpty(),
    check('phonenumber').not().isEmpty()
  ],
  usersControllers.signup
);

router.patch(
  '/:uid',
  [
    check('name').not().isEmpty(),
    check('address').not().isEmpty(),
    check('phonenumber').not().isEmpty()
  ],
  usersControllers.editUser
);

router.post('/login', usersControllers.login);

router.post('/:uid', usersControllers.payment);

module.exports = router;