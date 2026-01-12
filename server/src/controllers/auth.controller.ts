import type { Request, Response } from "express";
import { AuthService } from "../services/auth.service.js";

export const AuthController = {
	async login(req: Request, res: Response) {
		try {
			const body = (req as any).validatedBody;
			const result = await AuthService.login(body.email, body.password);
			if (!result) return res.status(401).json({ message: "Sai thông tin đăng nhập" });
			res.json(result);
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async register(req: Request, res: Response) {
		try {
			const body = (req as any).validatedBody;
			const id = await AuthService.register(body);
			res.status(201).json({ id });
		} catch (err) {
			res.status(500).json({ message: "Server error", error: err });
		}
	},

	async me(req: Request, res: Response) {
		res.json((req as any).user);
	},

	async logout(req: Request, res: Response) {
		res.json({ message: "Logged out" });
	},
};
