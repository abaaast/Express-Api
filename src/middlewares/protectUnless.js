const jwt = require("jsonwebtoken");

const protectUnless = (excludedPaths = []) => {
  return (req, res, next) => {
    const isExcluded = excludedPaths.some((path) => {
      // cocokkan dengan path persis atau prefix
      return req.path === path || req.path.startsWith(path);
    });

    if (isExcluded) return next();

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.toLowerCase().startsWith("bearer ")) {
      const token = authHeader.split(" ")[1];

      try {
        const decoded = jwt.verify(token, process.env.AUTH_JWT_SECRET);
        req.user = decoded;
        return next();
      } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
      }
    } else {
      return res.status(401).json({ message: "No token provided" });
    }
  };
};

module.exports = protectUnless;
