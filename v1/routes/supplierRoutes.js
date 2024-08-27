const express = require('express');
const { querySuppliers } = require('../contrellers/supplierController');

const router = express.Router();

router.post('/query', querySuppliers);

module.exports = router;

