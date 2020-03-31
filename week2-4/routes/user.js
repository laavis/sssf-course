'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const auth = require('../controllers/auth');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const router = express.Router();

const controller = require('../controllers/user');

router.get('/', controller.getUserList);

router.get('/:user_id', controller.getUserById);

router.post('/register', urlencodedParser, controller.createUser);

router.post('/login', urlencodedParser, auth.login);

module.exports = router;
