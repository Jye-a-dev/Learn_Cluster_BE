import { Request, Response } from "express";
import { RolePermissionModel } from "../models/role_permission.model.js";

export const RolePermissionController = {
	/* =========================
	   GET ALL
	========================= */
	async getAll(req: Request, res: Response) {
		try {
			const data = await RolePermissionModel.getAll();
			res.json(data);
		} catch (err) {
			res.status(500).json({ message: "Server error", error: String(err) });
		}
	},

	/* =========================
	   GET BY ID
	========================= */
	async getById(req: Request, res: Response) {
		try {
			const { id } = req.params;
			if (!id) {
				return res.status(400).json({ message: "Missing id" });
			}

			const data = await RolePermissionModel.getById(id);
			if (!data) {
				return res.status(404).json({ message: "Not found" });
			}

			res.json(data);
		} catch (err) {
			res.status(500).json({ message: "Server error", error: String(err) });
		}
	},

	/* =========================
	   GET BY ROLE
	========================= */
	async getByRoleId(req: Request, res: Response) {
		try {
			const { role_id } = req.params;
			if (!role_id) {
				return res.status(400).json({ message: "Missing role_id" });
			}

			const data = await RolePermissionModel.getByRoleId(role_id);
			res.json(data);
		} catch (err) {
			res.status(500).json({ message: "Server error", error: String(err) });
		}
	},

	/* =========================
	   GET BY PERMISSION
	========================= */
	async getByPermissionId(req: Request, res: Response) {
		try {
			const { permission_id } = req.params;
			if (!permission_id) {
				return res.status(400).json({ message: "Missing permission_id" });
			}

			const data = await RolePermissionModel.getByPermissionId(permission_id);
			res.json(data);
		} catch (err) {
			res.status(500).json({ message: "Server error", error: String(err) });
		}
	},

	/* =========================
	   ADD (ARRAY)
	========================= */
	async add(req: Request, res: Response) {
		try {
			const items = req.body as {
				role_id: string;
				permission_id: string;
			}[];

			for (const { role_id, permission_id } of items) {
				await RolePermissionModel.add(role_id, permission_id);
			}

			res.status(201).json({ success: true });
		} catch (err) {
			res.status(500).json({ message: "Server error", error: String(err) });
		}
	},

	/* =========================
	   REMOVE BY ID
	========================= */
	async removeById(req: Request, res: Response) {
		try {
			const { id } = req.params;
			if (!id) {
				return res.status(400).json({ message: "Missing id" });
			}

			await RolePermissionModel.removeById(id);
			res.json({ success: true });
		} catch (err) {
			res.status(500).json({ message: "Server error", error: String(err) });
		}
	},

	/* =========================
	   REMOVE (ARRAY role + permission)
	========================= */
	async remove(req: Request, res: Response) {
		try {
			const items = req.body as {
				role_id: string;
				permission_id: string;
			}[];

			for (const { role_id, permission_id } of items) {
				await RolePermissionModel.remove(role_id, permission_id);
			}

			res.json({ success: true });
		} catch (err) {
			res.status(500).json({ message: "Server error", error: String(err) });
		}
	},

	/* =========================
	   REMOVE BY ROLE
	========================= */
	async removeByRole(req: Request, res: Response) {
		try {
			const { role_id } = req.params;
			if (!role_id) {
				return res.status(400).json({ message: "Missing role_id" });
			}

			await RolePermissionModel.removeByRole(role_id);
			res.json({ success: true });
		} catch (err) {
			res.status(500).json({ message: "Server error", error: String(err) });
		}
	},

	/* =========================
	   REMOVE BY PERMISSION
	========================= */
	async removeByPermission(req: Request, res: Response) {
		try {
			const { permission_id } = req.params;
			if (!permission_id) {
				return res.status(400).json({ message: "Missing permission_id" });
			}

			await RolePermissionModel.removeByPermission(permission_id);
			res.json({ success: true });
		} catch (err) {
			res.status(500).json({ message: "Server error", error: String(err) });
		}
	},

	/* =========================
	   COUNT BY ROLE
	========================= */
	async countByRole(req: Request, res: Response) {
		try {
			const { role_id } = req.params;
			if (!role_id) {
				return res.status(400).json({ message: "Missing role_id" });
			}

			const total = await RolePermissionModel.countByRole(role_id);
			res.json({ total });
		} catch (err) {
			res.status(500).json({ message: "Server error", error: String(err) });
		}
	},

	/* =========================
	   COUNT BY PERMISSION
	========================= */
	async countByPermission(req: Request, res: Response) {
		try {
			const { permission_id } = req.params;
			if (!permission_id) {
				return res.status(400).json({ message: "Missing permission_id" });
			}

			const total = await RolePermissionModel.countByPermission(permission_id);
			res.json({ total });
		} catch (err) {
			res.status(500).json({ message: "Server error", error: String(err) });
		}
	},
	async putById(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const { role_id, permission_id } = req.body;

			if (!id) {
				return res.status(400).json({ message: "Missing id" });
			}
			if (!role_id || !permission_id) {
				return res.status(400).json({
					message: "role_id and permission_id are required",
				});
			}

			await RolePermissionModel.updateById(id, {
				role_id,
				permission_id,
			});

			res.json({ success: true });
		} catch (err) {
			res.status(500).json({ message: "Server error", error: String(err) });
		}
	},

	/* =========================
   PATCH (PARTIAL UPDATE BY ID)
========================= */
	async patchById(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const { role_id, permission_id } = req.body;

			if (!id) {
				return res.status(400).json({ message: "Missing id" });
			}
			if (!role_id && !permission_id) {
				return res.status(400).json({
					message: "At least one field is required",
				});
			}

			await RolePermissionModel.updateById(id, {
				role_id,
				permission_id,
			});

			res.json({ success: true });
		} catch (err) {
			res.status(500).json({ message: "Server error", error: String(err) });
		}
	},
};
