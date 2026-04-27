const express = require('express');
const router = express.Router();

const {
    getStocks,
    createStock,
    updateStock, getStockById, deleteStock,
} = require("../../controllers/stock/controller");

router.get('/', getStocks);
router.get('/:id', getStockById);
router.post('/', createStock);
router.put('/:id', updateStock);
router.delete('/:id', deleteStock);

module.exports = router;