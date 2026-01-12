import type { Request, Response } from "express";
import type { ApiResponse } from "../interfaces/response.interface.js";
import { RoleService } from "../services/role.service.js";

export const RoleController = {
	async getAll(req: Request, res: Response) {
		try {
			const roles = await RoleService.getAll();

			// Type-only, không dùng để trả response
			const _resData: ApiResponse<typeof roles> = {
				success: true,
				data: roles,
			};

			// ❗ Giữ nguyên structure cũ
			res.json(roles || []);
		} catch (err) {
			res.status(500).json({
				message: "Server error",
				error: err instanceof Error ? err.message : err,
			});
		}
	},

	async getById(req: Request, res: Response) {
		try {
			const params = (req as any).validatedParams;
			const id = params?.id;

			if (!id) {
				return res.status(400).json({ message: "Yêu cầu Role ID" });
			}

			const role = await RoleService.getById(id);
			if (!role) {
				return res.status(404).json({ message: "Không thấy role" });
			}

			const _resData: ApiResponse<typeof role> = {
				success: true,
				data: role,
			};

			res.json(role);
		} catch (err) {
			res.status(500).json({
				message: "Server error",
				error: err instanceof Error ? err.message : err,
			});
		}
	},

	async count(req: Request, res: Response) {
		try {
			const total = await RoleService.count();

			const _resData: ApiResponse<{ total: number }> = {
				success: true,
				data: { total },
			};

			res.json({ total });
		} catch (err) {
			res.status(500).json({
				message: "Server error",
				error: err instanceof Error ? err.message : err,
			});
		}
	},

	async create(req: Request, res: Response) {
		try {
			const body = (req as any).validatedBody;
			const id = await RoleService.create(body);

			const _resData: ApiResponse<{ id: number }> = {
				success: true,
				message: "Created successfully",
				data: { id },
			};

			res.status(201).json({ id });
		} catch (err) {
			res.status(500).json({
				message: "Server error",
				error: err instanceof Error ? err.message : err,
			});
		}
	},

	async update(req: Request, res: Response) {
		try {
			const params = (req as any).validatedParams;
			const body = (req as any).validatedBody;
			const id = params?.id;

			if (!id) {
				return res.status(400).json({ message: "Yêu cầu Role ID" });
			}

			await RoleService.update(id, body);

			const _resData: ApiResponse<null> = {
				success: true,
				message: "Role updated",
			};

			res.json({ message: "Role updated" });
		} catch (err) {
			res.status(500).json({
				message: "Server error",
				error: err instanceof Error ? err.message : err,
			});
		}
	},

	async delete(req: Request, res: Response) {
		try {
			const params = (req as any).validatedParams;
			const id = params?.id;

			if (!id) {
				return res.status(400).json({ message: "Yêu cầu Role ID" });
			}

			await RoleService.delete(id);

			const _resData: ApiResponse<null> = {
				success: true,
				message: "Role deleted",
			};

			res.json({ message: "Role deleted" });
		} catch (err) {
			res.status(500).json({
				message: "Server error",
				error: err instanceof Error ? err.message : err,
			});
		}
	},
};
