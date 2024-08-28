const express = require('express');
const {createSupplier, querySuppliers } = require('../contrellers/supplierController');

const router = express.Router();

router.post('/querySupplier', querySuppliers);
router.post('/createSupplier', createSupplier); 

module.exports = router;

