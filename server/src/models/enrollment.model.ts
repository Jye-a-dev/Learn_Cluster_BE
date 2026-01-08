import type { Enrollment } from "../@types/enrollment.js";
import { db as pool } from "../config/db.js";

export const EnrollmentModel = {
	async getAll(): Promise<Enrollment[]> {
		const [rows] = await pool.query("SELECT * FROM enrollments");
		return rows as Enrollment[];
	},

	async getById(id: number): Promise<Enrollment | null> {
		const [rows] = await pool.query("SELECT * FROM enrollments WHERE id = ?", [id]);
		return (rows as Enrollment[])[0] || null;
	},

	async create(enrollment: Partial<Enrollment>): Promise<number> {
		const { user_id, course_id } = enrollment;
		const [result] = await pool.query(
			"INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)",
			[user_id, course_id]
		);
		return (result as any).insertId;
	},

	async update(id: number, data: Partial<Enrollment>): Promise<void> {
		const fields = Object.keys(data).map(k => `${k} = ?`).join(", ");
		const values = Object.values(data);
		await pool.query(`UPDATE enrollments SET ${fields} WHERE id = ?`, [...values, id]);
	},

	async delete(id: number): Promise<void> {
		await pool.query("DELETE FROM enrollments WHERE id = ?", [id]);
	},

	async count(): Promise<number> {
		const [rows] = await pool.query("SELECT COUNT(*) as total FROM enrollments");
		return (rows as any)[0].total || 0;
	},
};
