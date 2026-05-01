const express = require('express');
const router = express.Router();

const {
    getCategories,
    createCategory,
} = require("../../controllers/category/controller");
const { authRequired } = require("../../middleware/auth");

router.get("/", getCategories);
router.post("/", authRequired, createCategory);

module.exports = router;