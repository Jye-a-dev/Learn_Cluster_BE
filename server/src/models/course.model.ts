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
	async getByTeacher(teacher_id: string): Promise<Course[]> {
		const [rows] = await pool.query(`SELECT * FROM courses WHERE teacher_id = ? ORDER BY created_at DESC`, [teacher_id]);
		return rows as Course[];
	},

	async countFiltered(status?: string, teacher_id?: string, search?: string): Promise<number> {
		let sql = "SELECT COUNT(*) as total FROM courses WHERE 1=1";
		const params: any[] = [];

		if (status) {
			sql += " AND status = ?";
			params.push(status);
		}
		if (teacher_id) {
			sql += " AND teacher_id = ?";
			params.push(teacher_id);
		}
		if (search) {
			sql += " AND (title LIKE ? OR description LIKE ?)";
			params.push(`%${search}%`, `%${search}%`);
		}

		const [rows] = await pool.query(sql, params);
		return (rows as any)[0].total || 0;
	},

	async getFiltered(options: { status?: string; teacher_id?: string; search?: string; page?: number; limit?: number }): Promise<Course[]> {
		let sql = "SELECT * FROM courses WHERE 1=1";
		const params: any[] = [];

		if (options.status) {
			sql += " AND status = ?";
			params.push(options.status);
		}
		if (options.teacher_id) {
			sql += " AND teacher_id = ?";
			params.push(options.teacher_id);
		}
		if (options.search) {
			sql += " AND (title LIKE ? OR description LIKE ?)";
			params.push(`%${options.search}%`, `%${options.search}%`);
		}

		sql += " ORDER BY created_at DESC";

		if (options.page && options.limit) {
			const offset = (options.page - 1) * options.limit;
			sql += " LIMIT ? OFFSET ?";
			params.push(options.limit, offset);
		}

		const [rows] = await pool.query(sql, params);
		return rows as Course[];
	},
	
};
