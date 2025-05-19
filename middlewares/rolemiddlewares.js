const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    const user = req.user;
    console.log("user", user)
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    if (!allowedRoles.includes(user.role)) {
      return res
        .status(403)
        .json({ message: "Forbidden: Insufficient privileges" });
    }
    next();
  };
};

module.exports = roleMiddleware;