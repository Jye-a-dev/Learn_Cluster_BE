// src/models/role-permission.model.ts
import type { RolePermission } from "../@types/role_permission.js";
import { db as pool } from "../config/db.js";

export const RolePermissionModel = {
	async getByRoleId(role_id: number): Promise<RolePermission[]> {
		const [rows] = await pool.query("SELECT * FROM role_permissions WHERE role_id = ?", [role_id]);
		return rows as RolePermission[];
	},
	async getAll(): Promise<RolePermission[]> {
		const [rows] = await pool.query("SELECT * FROM role_permissions");
		return rows as RolePermission[];
	},

	async add(role_id: number, permission_id: number): Promise<void> {
		await pool.query("INSERT INTO role_permissions (role_id, permission_id) VALUES (?, ?)", [role_id, permission_id]);
	},

	async remove(role_id: number, permission_id: number): Promise<void> {
		await pool.query("DELETE FROM role_permissions WHERE role_id = ? AND permission_id = ?", [role_id, permission_id]);
	},

	async removeByRole(role_id: number): Promise<void> {
		await pool.query("DELETE FROM role_permissions WHERE role_id = ?", [role_id]);
	},

	async countByRole(role_id: number): Promise<number> {
		const [rows] = await pool.query("SELECT COUNT(*) AS total FROM role_permissions WHERE role_id = ?", [role_id]);
		return (rows as any)[0].total || 0;
	},
};
