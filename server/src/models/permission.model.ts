import type { Permission } from "../@types/permission.js";
import { db as pool } from "../config/db.js";

export const PermissionModel = {
	async getAll(page: number, limit: number, keyword?: string): Promise<Permission[]> {
		let sql = "SELECT * FROM permissions";
		const params: any[] = [];

		if (keyword) {
			sql += " WHERE name LIKE ?";
			params.push(`%${keyword}%`);
		}

		sql += " ORDER BY id DESC";

		if (typeof limit === "number" && limit > 0) {
			sql += " LIMIT ?";
			params.push(limit);
		}

		const [rows] = await pool.query(sql, params);
		return rows as Permission[];
	},

	async getById(id: number): Promise<Permission | null> {
		const [rows] = await pool.query("SELECT * FROM permissions WHERE id = ?", [id]);
		return (rows as Permission[])[0] ?? null;
	},

	async create(data: Partial<Permission>): Promise<number> {
		const { name, description } = data;
		const [result] = await pool.query("INSERT INTO permissions (name, description) VALUES (?, ?)", [name, description ?? null]);
		return (result as any).insertId;
	},

	async update(id: number, data: Partial<Permission>): Promise<void> {
		if (!Object.keys(data).length) return;

		const fields = Object.keys(data)
			.map((k) => `${k} = ?`)
			.join(", ");
		const values = Object.values(data);

		await pool.query(`UPDATE permissions SET ${fields} WHERE id = ?`, [...values, id]);
	},

	async delete(id: number): Promise<void> {
		await pool.query("DELETE FROM permissions WHERE id = ?", [id]);
	},

	async count(): Promise<number> {
		const [rows] = await pool.query("SELECT COUNT(*) AS total FROM permissions");
		return (rows as any)[0]?.total ?? 0;
	},
};
