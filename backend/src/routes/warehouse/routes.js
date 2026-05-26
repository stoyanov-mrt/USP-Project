const express = require('express');
const router = express.Router();

const {
    getWarehouses,
    createWarehouse, getWarehouseById, updateWarehouse, deleteWarehouse,
} = require("../../controllers/warehouse/controller");
const { authRequired } = require("../../middleware/auth");

router.get("/", getWarehouses);
router.get("/:id", getWarehouseById);
router.post("/", authRequired, createWarehouse);
router.put("/:id", authRequired, updateWarehouse);
router.delete("/:id", authRequired, deleteWarehouse);

module.exports = router;