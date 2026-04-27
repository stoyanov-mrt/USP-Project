const express = require('express');
const router = express.Router();

const {
    getWarehouses,
    createWarehouse, getWarehouseById, updateWarehouse, deleteWarehouse,
} = require("../../controllers/warehouse/controller");

router.get("/", getWarehouses);
router.get("/:id", getWarehouseById);
router.post("/", createWarehouse);
router.put("/:id", updateWarehouse);
router.delete("/:id", deleteWarehouse);

module.exports = router;