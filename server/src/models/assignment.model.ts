import type { Assignment } from "../@types/assignment.js";
import { db as pool } from "../config/db.js";

export const AssignmentModel = {
	async getAll(): Promise<Assignment[]> {
		const [rows] = await pool.query("SELECT * FROM assignments");
		return rows as Assignment[];
	},

	async getById(id: number): Promise<Assignment | null> {
		const [rows] = await pool.query("SELECT * FROM assignments WHERE id = ?", [id]);
		return (rows as Assignment[])[0] || null;
	},

	async create(data: Partial<Assignment>): Promise<number> {
		const { course_id, title, description, file_url, deadline } = data;
		const [result] = await pool.query(
			"INSERT INTO assignments (course_id, title, description, file_url, deadline) VALUES (?, ?, ?, ?, ?)",
			[course_id, title || null, description || null, file_url || null, deadline || null]
		);
		return (result as any).insertId;
	},

	async update(id: number, data: Partial<Assignment>): Promise<void> {
		const fields = Object.keys(data).map(k => `${k} = ?`).join(", ");
		const values = Object.values(data);
		await pool.query(`UPDATE assignments SET ${fields} WHERE id = ?`, [...values, id]);
	},

	async delete(id: number): Promise<void> {
		await pool.query("DELETE FROM assignments WHERE id = ?", [id]);
	},

	async count(): Promise<number> {
		const [rows] = await pool.query("SELECT COUNT(*) as total FROM assignments");
		return (rows as any)[0].total || 0;
	},
};
