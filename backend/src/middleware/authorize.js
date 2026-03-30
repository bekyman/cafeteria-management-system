import { ROLES } from "../rbac/roles.js";

export const authorize = (...allowedPermissions) => {
  return (req, res, next) => {
    const userRole = req.user.role;

    const rolePermissions = ROLES[userRole];
    if (!Array.isArray(rolePermissions)) {
      return res.status(403).json({
        message: "Forbidden: unknown role",
      });
    }

    const hasPermission = allowedPermissions.some(permission =>
      rolePermissions.includes(permission)
    );

    if (!hasPermission) {
      return res.status(403).json({
        message: "Forbidden: insufficient permissions",
      });
    }

    next();
  };
};