// src/controllers/role-permission.controller.ts
import type { Request, Response } from "express";
import { RolePermissionService } from "../services/role_permission.service.js";

export const RolePermissionController = {
	async getByRoleId(req: Request, res: Response) {
		try {
			const params = (req as any).validatedParams;
			const role_id = params?.role_id;
			if (!role_id) return res.status(400).json({ message: "Yêu cầu Role ID" });

			const data = await RolePermissionService.getByRoleId(role_id);
			res.json(data || []);
		} catch (err) {
			console.error("getByRoleId error:", err);
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},
async getAll(req: Request, res: Response) {
	try {
		const data = await RolePermissionService.getAll();
		res.json(data || []);
	} catch (err) {
		console.error("getAll role-permissions error:", err);
		res.status(500).json({
			message: "Server error",
			error: err instanceof Error ? err.message : err,
		});
	}
},
	async add(req: Request, res: Response) {
		try {
			const body = (req as any).validatedBody;
			const { role_id, permission_id } = body;

			await RolePermissionService.add(role_id, permission_id);
			res.status(201).json({ message: "Permission added to role" });
		} catch (err) {
			console.error("add role-permission error:", err);
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},

	async remove(req: Request, res: Response) {
		try {
			const body = (req as any).validatedBody;
			const { role_id, permission_id } = body;

			await RolePermissionService.remove(role_id, permission_id);
			res.json({ message: "Permission removed from role" });
		} catch (err) {
			console.error("remove role-permission error:", err);
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},

	async removeByRole(req: Request, res: Response) {
		try {
			const params = (req as any).validatedParams;
			const role_id = params?.role_id;
			if (!role_id) return res.status(400).json({ message: "Yêu cầu Role ID" });

			await RolePermissionService.removeByRole(role_id);
			res.json({ message: "All permissions removed from role" });
		} catch (err) {
			console.error("removeByRole error:", err);
			res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
		}
	},
};