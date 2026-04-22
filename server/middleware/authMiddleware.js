const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    if (token && token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "No token, access denied" });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verified;
    next();

  } catch (error) {
    return res.json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;