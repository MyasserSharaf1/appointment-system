// Middleware to verify user role
exports.requireRole = (role) => {
    return (req, res, next) => {
      if (req.user.role !== role) {
        return res.status(403).json({ 
          success: false, 
          error: `Access denied. Requires ${role} role` 
        });
      }
      next();
    };
  };