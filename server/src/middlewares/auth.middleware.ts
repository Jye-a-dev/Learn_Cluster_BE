import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.js";
import { HTTP_STATUS } from "../constants/http-status.constant.js";
import type { JwtUserPayload } from "../interfaces/jwt.interface.js";

/**
 * Require user to be authenticated
 * - Support Authorization Bearer
 * - Support cookie access_token
 */
export function requireAuth(req: Request, res: Response, next: NextFunction) {
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

		const payload = decoded as JwtUserPayload;
		(req as any).user = payload;
		next();
	} catch {
		return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Invalid or expired token" });
	}
}

/**
 * Require specific permission (RBAC)
 */
export function requirePermission(permission: string) {
	return (req: Request, res: Response, next: NextFunction) => {
		const user = (req as any).user as JwtUserPayload | undefined;

		if (!user || !Array.isArray(user.permissions)) {
			return res.status(HTTP_STATUS.FORBIDDEN).json({ message: "Forbidden" });
		}

		if (!user.permissions.includes(permission)) {
			return res.status(HTTP_STATUS.FORBIDDEN).json({ message: "Permission denied" });
		}

		next();
	};
}

/**
 * Require user has one of roles
 */
export function requireRole(...roles: string[]) {
	return (req: Request, res: Response, next: NextFunction) => {
		const user = (req as any).user as JwtUserPayload | undefined;

		if (!user?.role) {
			return res.status(HTTP_STATUS.FORBIDDEN).json({ message: "Forbidden" });
		}

		if (!roles.includes(user.role)) {
			return res.status(HTTP_STATUS.FORBIDDEN).json({ message: "Role denied" });
		}

		next();
	};
}
