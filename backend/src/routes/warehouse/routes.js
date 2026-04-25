const express = require('express');
const router = express.Router();

const {
    getWarehouses,
    createWarehouse,
} = require("../../controllers/warehouse/controller");

router.get("/", getWarehouses);
router.post("/", createWarehouse);

module.exports = router;