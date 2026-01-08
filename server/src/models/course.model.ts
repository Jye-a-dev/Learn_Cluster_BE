import type { Course } from "../@types/course.js";
import { db as pool } from "../config/db.js";

export const CourseModel = {
	async getAll(): Promise<Course[]> {
		const [rows] = await pool.query("SELECT * FROM courses");
		return rows as Course[];
	},

	async getById(id: number): Promise<Course | null> {
		const [rows] = await pool.query("SELECT * FROM courses WHERE id = ?", [id]);
		return (rows as Course[])[0] || null;
	},

	async create(course: Partial<Course>): Promise<number> {
		const { title, description, objective, duration_hours, status, teacher_id } = course;
		const [result] = await pool.query("INSERT INTO courses (title, description, objective, duration_hours, status, teacher_id) VALUES (?, ?, ?, ?, ?, ?)", [
			title,
			description || null,
			objective || null,
			duration_hours || null,
			status || "draft",
			teacher_id || null,
		]);
		return (result as any).insertId;
	},

	async update(id: number, data: Partial<Course>): Promise<void> {
		const fields = Object.keys(data)
			.map((k) => `${k} = ?`)
			.join(", ");
		const values = Object.values(data);
		await pool.query(`UPDATE courses SET ${fields} WHERE id = ?`, [...values, id]);
	},

	async delete(id: number): Promise<void> {
		await pool.query("DELETE FROM courses WHERE id = ?", [id]);
	},

	async count(): Promise<number> {
		const [rows] = await pool.query("SELECT COUNT(*) as total FROM courses");
		return (rows as any)[0].total || 0;
	},
	async getAllFull(): Promise<any[]> {
		const [rows] = await pool.query(`
    SELECT c.*, u.username AS teacher_name
    FROM courses c
    LEFT JOIN users u ON c.teacher_id = u.id
  `);
		return rows as any[];
	},

	async getFullById(id: number): Promise<any | null> {
		const [rows] = await pool.query(
			`
    SELECT c.*, u.username AS teacher_name
    FROM courses c
    LEFT JOIN users u ON c.teacher_id = u.id
    WHERE c.id = ?
  `,
			[id]
		);
		return (rows as any[])[0] || null;
	},
};
