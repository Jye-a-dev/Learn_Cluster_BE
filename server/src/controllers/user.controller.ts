// src/controllers/user.controller.ts
import type { Request, Response } from "express";
import { UserService } from "../services/user.service.js";

export const UserController = {
	async getAll(req: Request, res: Response) {
		try {
			console.log("validatedQuery:", (req as any).validatedQuery);
			const query = (req as any).validatedQuery;
			const users = await UserService.getAll(query);
			res.json(users || []);
		} catch (err) {
			console.error("getAll error:", err);
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},

	async getById(req: Request, res: Response) {
		try {
			console.log("validatedParams:", (req as any).validatedParams);
			const params = (req as any).validatedParams;
			const id = params?.id;
			if (!id) return res.status(400).json({ message: "Yêu cầu User ID" });

			const user = await UserService.getById(id);
			if (!user) return res.status(404).json({ message: "Không thấy user" });

			res.json(user);
		} catch (err) {
			console.error("getById error:", err);
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},

	async getFullById(req: Request, res: Response) {
		try {
			const params = (req as any).validatedParams;
			const id = params?.id;
			if (!id) return res.status(400).json({ message: "Yêu cầu User ID" });

			const user = await UserService.getFullById(id);
			if (!user) return res.status(404).json({ message: "Không thấy user" });

			res.json(user);
		} catch (err) {
			console.error("getFullById error:", err);
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},

	async count(req: Request, res: Response) {
		try {
			const total = await UserService.count();
			res.json({ total });
		} catch (err) {
			console.error("count error:", err);
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},

	async create(req: Request, res: Response) {
		try {
			console.log("validatedBody:", (req as any).validatedBody);
			const body = (req as any).validatedBody;
			const id = await UserService.create(body);
			res.status(201).json({ id });
		} catch (err) {
			console.error("create error:", err);
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},

	async update(req: Request, res: Response) {
		try {
			const params = (req as any).validatedParams;
			const body = (req as any).validatedBody;
			const id = params?.id;
			if (!id) return res.status(400).json({ message: "Yêu cầu User ID" });

			await UserService.update(id, body);
			res.json({ message: "User updated" });
		} catch (err) {
			console.error("update error:", err);
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},

	async delete(req: Request, res: Response) {
		try {
			const params = (req as any).validatedParams;
			const id = params?.id;
			if (!id) return res.status(400).json({ message: "Yêu cầu User ID" });

			await UserService.delete(id);
			res.json({ message: "User deleted" });
		} catch (err) {
			console.error("delete error:", err);
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},
};
