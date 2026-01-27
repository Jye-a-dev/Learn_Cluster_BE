import type { RolePermission } from "../@types/role_permission.js";
import { db as pool } from "../config/db.js";

export const RolePermissionModel = {
	/* ---------- GET ---------- */

	async getAll(): Promise<RolePermission[]> {
		const [rows] = await pool.query("SELECT * FROM role_permissions");
		return rows as RolePermission[];
	},

	async getById(id: string): Promise<RolePermission | null> {
		const [rows] = await pool.query("SELECT * FROM role_permissions WHERE id = ?", [id]);
		return (rows as RolePermission[])[0] || null;
	},

	async getByRoleId(role_id: string): Promise<RolePermission[]> {
		const [rows] = await pool.query("SELECT * FROM role_permissions WHERE role_id = ?", [role_id]);
		return rows as RolePermission[];
	},

	async getByPermissionId(permission_id: string): Promise<RolePermission[]> {
		const [rows] = await pool.query("SELECT * FROM role_permissions WHERE permission_id = ?", [permission_id]);
		return rows as RolePermission[];
	},

	/* ---------- CREATE ---------- */

	async add(role_id: string, permission_id: string): Promise<void> {
		await pool.query(
			`INSERT INTO role_permissions (role_id, permission_id)
       VALUES (?, ?)`,
			[role_id, permission_id],
		);
	},

	/* ---------- DELETE ---------- */

	async removeById(id: string): Promise<void> {
		await pool.query("DELETE FROM role_permissions WHERE id = ?", [id]);
	},

	async remove(role_id: string, permission_id: string): Promise<void> {
		await pool.query(
			`DELETE FROM role_permissions
       WHERE role_id = ? AND permission_id = ?`,
			[role_id, permission_id],
		);
	},

	async removeByRole(role_id: string): Promise<void> {
		await pool.query("DELETE FROM role_permissions WHERE role_id = ?", [role_id]);
	},

	async removeByPermission(permission_id: string): Promise<void> {
		await pool.query("DELETE FROM role_permissions WHERE permission_id = ?", [permission_id]);
	},

	/* ---------- COUNT ---------- */

	async countByRole(role_id: string): Promise<number> {
		const [rows] = await pool.query("SELECT COUNT(*) AS total FROM role_permissions WHERE role_id = ?", [role_id]);
		return Number((rows as any)[0]?.total ?? 0);
	},

	async countByPermission(permission_id: string): Promise<number> {
		const [rows] = await pool.query("SELECT COUNT(*) AS total FROM role_permissions WHERE permission_id = ?", [permission_id]);
		return Number((rows as any)[0]?.total ?? 0);
	},
	async updateById(
		id: string,
		data: {
			role_id?: string;
			permission_id?: string;
		},
	): Promise<void> {
		const fields = Object.keys(data)
			.map((k) => `${k} = ?`)
			.join(", ");

		if (!fields) return;

		const values = Object.values(data);
		await pool.query(`UPDATE role_permissions SET ${fields} WHERE id = ?`, [...values, id]);
	},
};
