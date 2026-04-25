const prisma = require("../../prisma/prismaClient");

const getStocks = async (req, res) => {
    try {
        const stocks = await prisma.stock.findMany({
            include: {
                product: true,
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

        const stock = await prisma.stock.create({
            data: {
                productId: Number(productId),
                warehouseId: Number(warehouseId),
                quantity: Number(quantity),
            }
        })

        res.status(201).json(stock);
    } catch (error) {
        res.status(500).json({ message: `Error creating stock: ${error}` });
    }
}

const updateStock = async (req, res) => {
    try {
        const stockID = Number(req.params.id);

        const { quantity } = req.body;

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
        res.status(500).json( {message: `Error updating stock: ${error}`} );
    }
}

module.exports = {
    getStocks,
    createStock,
    updateStock,
}