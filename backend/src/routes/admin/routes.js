const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../../prisma/prismaClient");
const { authRequired, adminRequired, getJwtSecret } = require("../../middleware/auth");

const router = express.Router();

// Hardcoded admin login requested by user: admin/admin
router.post("/login", async (req, res) => {
  const { username, password } = req.body || {};
  if (username !== "admin" || password !== "admin") {
    return res.status(401).json({ message: "Invalid admin credentials" });
  }

  const token = jwt.sign(
    { sub: "admin", email: "admin", role: "ADMIN" },
    getJwtSecret(),
    { expiresIn: "7d" }
  );

  return res.status(200).json({
    token,
    admin: { username: "admin", role: "ADMIN" },
  });
});

router.get("/users", authRequired, adminRequired, async (req, res) => {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, email: true, role: true, isActive: true, createdAt: true, updatedAt: true },
  });
  return res.json(users);
});

router.post("/users", authRequired, adminRequired, async (req, res) => {
  try {
    const { email, password, role, isActive } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: "email and password are required" });
    }

    const passwordHash = await bcrypt.hash(String(password), 10);
    const user = await prisma.user.create({
      data: {
        email: String(email).toLowerCase(),
        passwordHash,
        role: role === "ADMIN" ? "ADMIN" : "USER",
        isActive: typeof isActive === "boolean" ? isActive : true,
      },
      select: { id: true, email: true, role: true, isActive: true, createdAt: true, updatedAt: true },
    });
    return res.status(201).json(user);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({ message: "User with this email already exists" });
    }
    return res.status(500).json({ message: `Failed to create user: ${error.message || error}` });
  }
});

router.put("/users/:id", authRequired, adminRequired, async (req, res) => {
  try {
    const userId = Number(req.params.id);
    if (Number.isNaN(userId)) return res.status(400).json({ message: "Invalid user id" });

    const { email, password, role, isActive } = req.body || {};
    const data = {};

    if (email) data.email = String(email).toLowerCase();
    if (typeof isActive === "boolean") data.isActive = isActive;
    if (role) data.role = role === "ADMIN" ? "ADMIN" : "USER";
    if (password) data.passwordHash = await bcrypt.hash(String(password), 10);

    const user = await prisma.user.update({
      where: { id: userId },
      data,
      select: { id: true, email: true, role: true, isActive: true, createdAt: true, updatedAt: true },
    });
    return res.status(200).json(user);
  } catch (error) {
    if (error.code === "P2025") return res.status(404).json({ message: "User not found" });
    if (error.code === "P2002") return res.status(409).json({ message: "Email already in use" });
    return res.status(500).json({ message: `Failed to update user: ${error.message || error}` });
  }
});

router.delete("/users/:id", authRequired, adminRequired, async (req, res) => {
  try {
    const userId = Number(req.params.id);
    if (Number.isNaN(userId)) return res.status(400).json({ message: "Invalid user id" });

    const deleted = await prisma.user.delete({
      where: { id: userId },
      select: { id: true, email: true },
    });
    return res.status(200).json(deleted);
  } catch (error) {
    if (error.code === "P2025") return res.status(404).json({ message: "User not found" });
    return res.status(500).json({ message: `Failed to delete user: ${error.message || error}` });
  }
});

router.get("/dashboard-settings", authRequired, adminRequired, async (req, res) => {
  const settings = await prisma.dashboardSettings.findFirst();
  return res.status(200).json(
    settings || { title: "Warehouse Inventory System", subtitle: "Electronics Distribution Center" }
  );
});

router.put("/dashboard-settings", authRequired, adminRequired, async (req, res) => {
  const { title, subtitle } = req.body || {};

  const existing = await prisma.dashboardSettings.findFirst();
  const settings = existing
    ? await prisma.dashboardSettings.update({
        where: { id: existing.id },
        data: {
          ...(typeof title === "string" ? { title } : {}),
          ...(typeof subtitle === "string" ? { subtitle } : {}),
        },
      })
    : await prisma.dashboardSettings.create({
        data: {
          title: typeof title === "string" ? title : "Warehouse Inventory System",
          subtitle: typeof subtitle === "string" ? subtitle : "Electronics Distribution Center",
        },
      });

  return res.status(200).json(settings);
});

module.exports = router;

