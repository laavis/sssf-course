'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const router = express.Router();

const userController = require('../controllers/user');

router.get('/', userController.getUserList);

router.get('/:id', userController.getUserById);

router.post('/', urlencodedParser, userController.addUser);

module.exports = router;
