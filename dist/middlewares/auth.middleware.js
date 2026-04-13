import { verifyToken } from "../utils/jwt.js";
import { HTTP_STATUS } from "../constants/http-status.constant.js";
/**
 * Require user to be authenticated
 * - Support Authorization Bearer
 * - Support cookie access_token
 */
export function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : req.cookies?.access_token;
    if (!token) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Unauthorized" });
    }
    try {
        const decoded = verifyToken(token);
        if (typeof decoded !== "object" || !("id" in decoded)) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Invalid token payload" });
        }
        const payload = decoded;
        req.user = payload;
        next();
    }
    catch {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Invalid or expired token" });
    }
}
/**
 * Require user has one of roles
 */
export function requireRole(...roles) {
    return (req, res, next) => {
        const user = req.user;
        if (!user?.role) {
            return res.status(HTTP_STATUS.FORBIDDEN).json({ message: "Forbidden" });
        }
        if (!roles.includes(user.role)) {
            return res.status(HTTP_STATUS.FORBIDDEN).json({ message: "Role denied" });
        }
        next();
    };
}
