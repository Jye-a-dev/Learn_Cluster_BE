import type { Course } from "../@types/course.js";
import { db as pool } from "../config/db.js";

export const CourseModel = {
	async getAll(): Promise<Course[]> {
		const [rows] = await pool.query("SELECT * FROM courses");
		return rows as Course[];
	},

	async getById(id: string): Promise<Course | null> {
		const [rows] = await pool.query("SELECT * FROM courses WHERE id = ?", [id]);
		return (rows as Course[])[0] || null;
	},

	async create(course: Partial<Course>): Promise<string> {
		const { title, description, objective, duration_hours, status } = course;

		await pool.query(
			`INSERT INTO courses (title, description, objective, duration_hours, status)
			 VALUES (?, ?, ?, ?, ?)`,
			[
				title,
				description ?? null,
				objective ?? null,
				duration_hours ?? null,
				status ?? "draft",
			]
		);

		// lấy UUID vừa tạo
		const [rows] = await pool.query(
			`SELECT id FROM courses WHERE title = ? ORDER BY created_at DESC LIMIT 1`,
			[title]
		);

		return (rows as any)[0].id;
	},

	async update(id: string, data: Partial<Course>): Promise<void> {
		const fields = Object.keys(data).map((k) => `${k} = ?`).join(", ");
		const values = Object.values(data);
		await pool.query(`UPDATE courses SET ${fields} WHERE id = ?`, [...values, id]);
	},

	async delete(id: string): Promise<void> {
		await pool.query("DELETE FROM courses WHERE id = ?", [id]);
	},

	async countFiltered(status?: string, search?: string): Promise<number> {
		let sql = "SELECT COUNT(*) as total FROM courses WHERE 1=1";
		const params: any[] = [];

		if (status) {
			sql += " AND status = ?";
			params.push(status);
		}
		if (search) {
			sql += " AND (title LIKE ? OR description LIKE ?)";
			params.push(`%${search}%`, `%${search}%`);
		}

		const [rows] = await pool.query(sql, params);
		return (rows as any)[0].total || 0;
	},

	async getFiltered(options: { status?: string; search?: string; page?: number; limit?: number }): Promise<Course[]> {
		let sql = "SELECT * FROM courses WHERE 1=1";
		const params: any[] = [];

		if (options.status) {
			sql += " AND status = ?";
			params.push(options.status);
		}
		if (options.search) {
			sql += " AND (title LIKE ? OR description LIKE ?)";
			params.push(`%${options.search}%`, `%${options.search}%`);
		}

		sql += " ORDER BY created_at DESC";

		if (options.page && options.limit) {
			sql += " LIMIT ? OFFSET ?";
			params.push(options.limit, (options.page - 1) * options.limit);
		}

		const [rows] = await pool.query(sql, params);
		return rows as Course[];
	},
};
