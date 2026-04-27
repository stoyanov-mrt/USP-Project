const express = require('express');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require("./routes/product/routes");
const warehouseRoutes = require("./routes/warehouse/routes");
const stockRoutes = require("./routes/stock/routes")

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Warehouse backend is running" });
});

app.use("/products", productRoutes);
app.use("/warehouses", warehouseRoutes);
app.use("/stocks", stockRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})