'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const auth = require('../controllers/auth');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const router = express.Router();

const userController = require('../controllers/user');

router.get('/', userController.getUserList);

router.get('/:user_id', userController.getUserById);

router.post('/register', urlencodedParser, userController.createUser);

router.post('/login', urlencodedParser, auth.testLogin);

module.exports = router;
