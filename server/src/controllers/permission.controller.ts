import type { Request, Response } from "express";
import { PermissionService } from "../services/permission.service.js";

export const PermissionController = {
	async getAll(req: Request, res: Response) {
		try {
			const query = (req as any).validatedQuery;
			const data = await PermissionService.getAll(query.page, query.limit, query.keyword);
			res.json(data);
		} catch (err) {
			res.status(500).json({ message: "Server error" });
		}
	},

	async getById(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;

			// KHÔNG convert number
			const data = await PermissionService.getById(id as any);

			if (!data) {
				return res.status(404).json({ message: "Not found" });
			}

			res.json(data);
		} catch {
			res.status(500).json({ message: "Server error" });
		}
	},

	async count(req: Request, res: Response) {
		try {
			const total = await PermissionService.count();
			res.json({ total });
		} catch {
			res.status(500).json({ message: "Server error" });
		}
	},

	async create(req: Request, res: Response) {
		try {
			const body = (req as any).validatedBody;
			const id = await PermissionService.create(body);
			res.status(201).json({ id });
		} catch (err: any) {
			if (err?.code === "ER_DUP_ENTRY") {
				return res.status(409).json({ message: "Permission name đã tồn tại" });
			}
			res.status(500).json({ message: "Server error" });
		}
	},

	async update(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;
			const body = (req as any).validatedBody;

			await PermissionService.update(id as any, body);
			res.json({ message: "Updated" });
		} catch {
			res.status(500).json({ message: "Server error" });
		}
	},

	async delete(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;

			await PermissionService.delete(id as any);
			res.json({ message: "Deleted" });
		} catch {
			res.status(500).json({ message: "Server error" });
		}
	},
};
