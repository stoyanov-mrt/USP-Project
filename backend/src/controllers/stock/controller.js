const prisma = require("../../prisma/prismaClient");

const getStocks = async (req, res) => {
    try {
        const stocks = await prisma.stock.findMany({
            include: {
                product: {
                    include: {
                        category: true,
                    },
                },
                warehouse: true,
            },
        });

        res.json(stocks);
    } catch (error) {
        res.status(500).json( {message: `Error getting stocks: ${error}`} );
    }
}

    const createStock = async (req, res) => {
        try {
            const { productId, warehouseId, quantity } = req.body;

            if (!productId || !warehouseId || quantity === undefined) {
                return res.status(400).json({ message: "productId, warehouseId and quantity are required!" });
            }

            if (Number(quantity) < 0) {
                return res.status(400).json({ message: "Quantity cant be a negative number!" });
            }

            const stock = await prisma.stock.create({
                data: {
                    productId: Number(productId),
                    warehouseId: Number(warehouseId),
                    quantity: Number(quantity),
                }
            })

            res.status(201).json(stock);

        } catch (error) {
            if (error.code === "P2002") {
                return res.status(409).json({ message: "Stock for this product and warehouse already exists!" });
            }
            res.status(500).json({ message: `Error creating stock: ${error}` });
        }
    }

const updateStock = async (req, res) => {
    try {
        const stockID = Number(req.params.id);

        const { quantity } = req.body;

        if (isNaN(stockID)) {
            return res.status(400).json({ message: `Invalid stock id!` });
        }

        if (quantity === undefined) {
            return res.status(400).json({ message: "Quantity is required!" });
        }
        if (Number(quantity) < 0) {
            return res.status(400).json({ message: "Quantity cant be a negative number!" });
        }

        const stock = await prisma.stock.update({
            where: {
                id: stockID,
            },
            data: {
                quantity: Number(quantity),
            }
        })

        res.status(200).json(stock);
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({ message: "Stock not found!" });
        }
        res.status(500).json( {message: `Error updating stock: ${error}`} );
    }
}

const getStockById = async (req, res) => {
    try {
        const stockId = Number(req.params.id);

        if (isNaN(stockId)) {
            return res.status(400).json({ message: `Invalid stock id!` });
        }

        const stock = await prisma.stock.findUnique({
            where: {
                id: stockId,
            },
            include: {
                product: true,
                warehouse: true,
            }
        })

        if (!stock) {
            return res.status(404).json({ message: "Stock not found!" });
        }

        res.status(200).json(stock);
    } catch (error) {
        res.status(500).json({ message: `Error getting stock: ${error.message}` });
    }
}

const deleteStock = async (req, res) => {
    try {
        const stockId = Number(req.params.id);

        if (isNaN(stockId)) {
            return res.status(400).json({ message: `Invalid stock id!` });
        }

        const deletedStock = await prisma.stock.delete({
            where: {
                id: stockId,
            }
        });

        res.status(200).json(deletedStock);
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({ message: "Stock not found!" });
        }

        res.status(500).json({ message: `Error deleting stock: ${error.message}` });
    }
}

module.exports = {
    getStocks,
    createStock,
    updateStock,
    getStockById,
    deleteStock,
}