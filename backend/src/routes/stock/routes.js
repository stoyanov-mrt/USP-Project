const express = require('express');
const router = express.Router();

const {
    getStocks,
    createStock,
    updateStock, getStockById, deleteStock,
} = require("../../controllers/stock/controller");
const { authRequired } = require("../../middleware/auth");

router.get('/', getStocks);
router.get('/:id', getStockById);
router.post('/', authRequired, createStock);
router.put('/:id', authRequired, updateStock);
router.delete('/:id', authRequired, deleteStock);

module.exports = router;