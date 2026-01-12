// src/models/study_date.model.ts
import type { StudyDate } from "../@types/study_date.js";
import { db as pool } from "../config/db.js";

export const StudyDateModel = {
	async getAll(): Promise<StudyDate[]> {
		const [rows] = await pool.query("SELECT * FROM study_dates");
		return rows as StudyDate[];
	},

	async getById(id: number): Promise<StudyDate | null> {
		const [rows] = await pool.query("SELECT * FROM study_dates WHERE id = ?", [id]);
		return (rows as StudyDate[])[0] || null;
	},
	async getFullById(id: number): Promise<any | null> {
		const [rows] = await pool.query(
			`
			SELECT 
				sd.*,
				(SELECT COUNT(*) 
				 FROM study_date_participants p 
				 WHERE p.study_date_id = sd.id) AS participants_count,
				(SELECT COUNT(*) 
				 FROM messages m 
				 WHERE m.study_date_id = sd.id) AS messages_count
			FROM study_dates sd
			WHERE sd.id = ?
			`,
			[id]
		);

		return (rows as any[])[0] || null;
	},
	async getByCourse(course_id: number): Promise<StudyDate[]> {
		const [rows] = await pool.query("SELECT * FROM study_dates WHERE course_id = ?", [course_id]);
		return rows as StudyDate[];
	},
	async getUpcoming(): Promise<StudyDate[]> {
		const [rows] = await pool.query(
			`SELECT * FROM study_dates 
		 WHERE scheduled_at >= NOW()
		 ORDER BY scheduled_at ASC`
		);
		return rows as StudyDate[];
	},
	async create(data: Partial<StudyDate>): Promise<number> {
		const { course_id, title, lesson_ids, scheduled_at, location, created_by } = data;
		const [result] = await pool.query(
			`
			INSERT INTO study_dates (course_id, title, lesson_ids, scheduled_at, location, created_by)
			VALUES (?, ?, ?, ?, ?, ?)
			`,
			[course_id, title ?? null, JSON.stringify(lesson_ids ?? null), scheduled_at ?? null, location ?? null, created_by ?? null]
		);
		return (result as any).insertId;
	},

	async update(id: number, data: Partial<StudyDate>): Promise<void> {
		const fields = Object.keys(data)
			.map((k) => `${k} = ?`)
			.join(", ");
		const values = Object.entries(data).map(([k, v]) => (k === "lesson_ids" ? JSON.stringify(v) : v));
		await pool.query(`UPDATE study_dates SET ${fields} WHERE id = ?`, [...values, id]);
	},

	async delete(id: number): Promise<void> {
		await pool.query("DELETE FROM study_dates WHERE id = ?", [id]);
	},

	async count(): Promise<number> {
		const [rows] = await pool.query("SELECT COUNT(*) as total FROM study_dates");
		return (rows as any)[0].total || 0;
	},
	async query(filters: any): Promise<StudyDate[]> {
		const conditions: string[] = [];
		const values: any[] = [];

		if (filters.course_id) {
			conditions.push("course_id = ?");
			values.push(filters.course_id);
		}

		if (filters.created_by) {
			conditions.push("created_by = ?");
			values.push(filters.created_by);
		}

		let sql = "SELECT * FROM study_dates";
		if (conditions.length) {
			sql += " WHERE " + conditions.join(" AND ");
		}

		sql += " ORDER BY scheduled_at ASC";

		if (filters.limit) {
			sql += " LIMIT ?";
			values.push(filters.limit);
			if (filters.page) {
				sql += " OFFSET ?";
				values.push((filters.page - 1) * filters.limit);
			}
		}

		const [rows] = await pool.query(sql, values);
		return rows as StudyDate[];
	},
	async updateLessons(id: number, lesson_ids: number[]): Promise<void> {
		await pool.query("UPDATE study_dates SET lesson_ids = ? WHERE id = ?", [JSON.stringify(lesson_ids), id]);
	},
};
