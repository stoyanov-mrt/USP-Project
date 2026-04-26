const prisma = require("../../prisma/prismaClient");


const getWarehouses = async (req, res) => {
    try {
        const warehouses = await prisma.warehouse.findMany({
            include: {
                stocks: true,
            },
        });

        res.json(warehouses);
    } catch (error) {
        res.status(500).json({ message: `Error getting warehouses ${error}` });
    }
}

const createWarehouse = async (req, res) => {
    try {
        const { name, location } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Name and location are required!" });
        }

        const warehouse = await prisma.warehouse.create({
            data: {
                name,
                location,
            }
        })

        res.status(201).json(warehouse);
    } catch (error) {
        res.status(500).json({ message: `Error creating warehouse ${error}` });
    }
}

module.exports = {
    getWarehouses,
    createWarehouse,
}