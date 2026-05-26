const jwt = require("jsonwebtoken");

function getJwtSecret() {
  return process.env.JWT_SECRET || "dev-secret-change-me";
}

function getBearerToken(req) {
  const header = req.headers.authorization || "";
  const [type, token] = header.split(" ");
  if (type !== "Bearer" || !token) return null;
  return token;
}

function authRequired(req, res, next) {
  const token = getBearerToken(req);
  if (!token) return res.status(401).json({ message: "Missing auth token" });

  try {
    const payload = jwt.verify(token, getJwtSecret());
    req.auth = payload;
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired auth token" });
  }
}

function adminRequired(req, res, next) {
  if (!req.auth) return res.status(401).json({ message: "Missing auth context" });
  if (req.auth.role !== "ADMIN") return res.status(403).json({ message: "Admin access required" });
  return next();
}

module.exports = {
  authRequired,
  adminRequired,
  getJwtSecret,
};

