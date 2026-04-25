const express = require('express');
const router = express.Router();

const {
    getStocks,
    createStock,
    updateStock,
} = require("../../controllers/stock/controller");

router.get('/', getStocks);
router.post('/', createStock);
router.put('/:id', updateStock);

module.exports = router;