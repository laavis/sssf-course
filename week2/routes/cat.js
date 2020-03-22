'use strict';
const express = require('express');
var multer = require('multer');
const catController = require('../controllers/cat');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', catController.getCatList);

router.get('/:id', catController.getCatById);

router.post('/', upload.single('cat'), catController.addCat);

router.put('/:id', catController.editCat);

router.delete('/:id', catController.deleteCat);

module.exports = router;
