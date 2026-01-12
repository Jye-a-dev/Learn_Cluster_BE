import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.js";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
	const auth = req.headers.authorization;
	if (!auth) return res.status(401).json({ message: "Unauthorized" });

	const token = auth.split(" ")[1];
	if (!token) return res.status(401).json({ message: "Unauthorized" });

	try {
		const payload = verifyToken(token);
		(req as any).user = payload;
		next();
	} catch {
		res.status(401).json({ message: "Invalid token" });
	}
}
