import type { Submission } from "../@types/submission.js";
import { db as pool } from "../config/db.js";

export const SubmissionModel = {
	async getAll(): Promise<Submission[]> {
		const [rows] = await pool.query("SELECT * FROM submissions");
		return rows as Submission[];
	},

	async getById(id: number): Promise<Submission | null> {
		const [rows] = await pool.query("SELECT * FROM submissions WHERE id = ?", [id]);
		return (rows as Submission[])[0] || null;
	},

	async create(data: Partial<Submission>): Promise<number> {
		const { assignment_id, student_id, file_url, text_submission } = data;
		const [result] = await pool.query(
			"INSERT INTO submissions (assignment_id, student_id, file_url, text_submission) VALUES (?, ?, ?, ?)",
			[assignment_id, student_id, file_url || null, text_submission || null]
		);
		return (result as any).insertId;
	},

	async update(id: number, data: Partial<Submission>): Promise<void> {
		const fields = Object.keys(data).map(k => `${k} = ?`).join(", ");
		const values = Object.values(data);
		await pool.query(`UPDATE submissions SET ${fields} WHERE id = ?`, [...values, id]);
	},

	async delete(id: number): Promise<void> {
		await pool.query("DELETE FROM submissions WHERE id = ?", [id]);
	},

	async count(): Promise<number> {
		const [rows] = await pool.query("SELECT COUNT(*) as total FROM submissions");
		return (rows as any)[0].total || 0;
	},
};
