// src/controllers/role.controller.ts
import type { Request, Response } from "express";
import { RoleService } from "../services/role.service.js";

export const RoleController = {
	async getAll(req: Request, res: Response) {
		try {
			const roles = await RoleService.getAll();
			res.json(roles || []);
		} catch (err) {
			console.error("getAll roles error:", err);
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},

	async getById(req: Request, res: Response) {
		try {
			const params = (req as any).validatedParams;
			const id = params?.id;
			if (!id) return res.status(400).json({ message: "Yêu cầu Role ID" });

			const role = await RoleService.getById(id);
			if (!role) return res.status(404).json({ message: "Không thấy role" });

			res.json(role);
		} catch (err) {
			console.error("getById role error:", err);
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},

	async count(req: Request, res: Response) {
		try {
			const total = await RoleService.count();
			res.json({ total });
		} catch (err) {
			console.error("count roles error:", err);
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},

	async create(req: Request, res: Response) {
		try {
			const body = (req as any).validatedBody;
			const id = await RoleService.create(body);
			res.status(201).json({ id });
		} catch (err) {
			console.error("create role error:", err);
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},

	async update(req: Request, res: Response) {
		try {
			const params = (req as any).validatedParams;
			const body = (req as any).validatedBody;
			const id = params?.id;
			if (!id) return res.status(400).json({ message: "Yêu cầu Role ID" });

			await RoleService.update(id, body);
			res.json({ message: "Role updated" });
		} catch (err) {
			console.error("update role error:", err);
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},

	async delete(req: Request, res: Response) {
		try {
			const params = (req as any).validatedParams;
			const id = params?.id;
			if (!id) return res.status(400).json({ message: "Yêu cầu Role ID" });

			await RoleService.delete(id);
			res.json({ message: "Role deleted" });
		} catch (err) {
			console.error("delete role error:", err);
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},
};
