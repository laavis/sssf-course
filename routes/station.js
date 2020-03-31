const express = require('express');
const passport = require('passport');
const router = express.Router();
const controller = require('../controllers/station');
const authCtrl = require('../controllers/auth');
const auth = authCtrl.auth;

router.get('/', controller.getStationList);
router.get('/:id', controller.getStation);
router.get('/near/:point', controller.getNearStationList);
router.post('/', auth, controller.addStation);
router.delete('/', auth, controller.deleteStation);
router.put('/', auth, controller.modifyStation);

module.exports = router;
