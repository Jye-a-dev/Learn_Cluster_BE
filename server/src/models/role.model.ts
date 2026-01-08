// src/models/role.model.ts
import type { Role } from "../@types/role.js";
import { db as pool } from "../config/db.js";

export const RoleModel = {
	async getAll(): Promise<Role[]> {
		const [rows] = await pool.query("SELECT * FROM roles");
		return rows as Role[];
	},

	async getById(id: number): Promise<Role | null> {
		const [rows] = await pool.query("SELECT * FROM roles WHERE id = ?", [id]);
		return (rows as Role[])[0] || null;
	},

	async create(role: Partial<Role>): Promise<number> {
		const { name, description } = role;
		const [result] = await pool.query("INSERT INTO roles (name, description) VALUES (?, ?)", [name, description || null]);
		return (result as any).insertId;
	},

	async update(id: number, data: Partial<Role>): Promise<void> {
		const fields = Object.keys(data)
			.map((k) => `${k} = ?`)
			.join(", ");
		const values = Object.values(data);
		await pool.query(`UPDATE roles SET ${fields} WHERE id = ?`, [...values, id]);
	},

	async delete(id: number): Promise<void> {
		await pool.query("DELETE FROM roles WHERE id = ?", [id]);
	},

	async count(): Promise<number> {
		const [rows] = await pool.query("SELECT COUNT(*) AS total FROM roles");
		return (rows as any)[0].total || 0;
	},
};
