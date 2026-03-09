// src/controllers/user.controller.ts
import type { Request, Response } from "express";
import { UserService } from "../user/user.service.js";
import jwt from "jsonwebtoken";

export const UserController = {


	/* ================= USERS ================= */

	async getAll(req: Request, res: Response) {
		try {
			const query = (req as any).validatedQuery;
			const users = await UserService.getAll(query);
			res.json(users || []);
		} catch {
			res.status(500).json({ message: "Server error" });
		}
	},

	async getById(req: Request, res: Response) {
		try {
			const id = (req as any).validatedParams?.id;
			if (!id) return res.status(400).json({ message: "User ID required" });

			const user = await UserService.getById(id);

			if (!user) {
				return res.status(404).json({ message: "User not found" });
			}

			res.json(user);
		} catch {
			res.status(500).json({ message: "Server error" });
		}
	},

	async getFullById(req: Request, res: Response) {
		try {
			const id = (req as any).validatedParams?.id;

			if (!id) {
				return res.status(400).json({ message: "User ID required" });
			}

			const user = await UserService.getFullById(id);

			if (!user) {
				return res.status(404).json({ message: "User not found" });
			}

			res.json(user);
		} catch {
			res.status(500).json({ message: "Server error" });
		}
	},

	async count(req: Request, res: Response) {
		try {
			const count = await UserService.count();

			res.json({
				count,
			});
		} catch {
			res.status(500).json({ message: "Server error" });
		}
	},

	async getByRole(req: Request, res: Response) {
		try {
			const role_id = (req as any).validatedParams?.role_id;

			const users = await UserService.getByRole(role_id);

			res.json(users || []);
		} catch {
			res.status(500).json({ message: "Server error" });
		}
	},

	async countByRole(req: Request, res: Response) {
		try {
			const role_id = (req as any).validatedParams?.role_id;

			const count = await UserService.countByRole(role_id);

			res.json({
				role_id,
				count,
			});
		} catch {
			res.status(500).json({ message: "Server error" });
		}
	},

	async create(req: Request, res: Response) {
		try {
			const body = (req as any).validatedBody;

			const id = await UserService.create(body);

			res.status(201).json({ id });
		} catch {
			res.status(500).json({ message: "Server error" });
		}
	},

	async update(req: Request, res: Response) {
		try {
			const params = (req as any).validatedParams;
			const body = (req as any).validatedBody;

			const id = params?.id;

			if (!id) {
				return res.status(400).json({ message: "User ID required" });
			}

			await UserService.update(id, body);

			res.json({ message: "User updated" });
		} catch {
			res.status(500).json({ message: "Server error" });
		}
	},

	async delete(req: Request, res: Response) {
		try {
			const id = (req as any).validatedParams?.id;

			if (!id) {
				return res.status(400).json({ message: "User ID required" });
			}

			await UserService.delete(id);

			res.json({
				message: "User deleted",
			});
		} catch {
			res.status(500).json({ message: "Server error" });
		}
	},

	async search(req: Request, res: Response) {
		try {
			const q = (req as any).validatedQuery?.q;

			const users = await UserService.search(q);

			res.json(users || []);
		} catch {
			res.status(500).json({ message: "Server error" });
		}
	},
};