import type { StudyDateLesson } from "../@types/study_date_lesson.js";
import { db as pool } from "../config/db.js";

export const StudyDateLessonModel = {
	async getAll(): Promise<StudyDateLesson[]> {
		const [rows] = await pool.query("SELECT * FROM study_date_lessons");
		return rows as StudyDateLesson[];
	},

	async getById(id: string): Promise<StudyDateLesson | null> {
		const [rows] = await pool.query("SELECT * FROM study_date_lessons WHERE id = ?", [id]);
		return (rows as StudyDateLesson[])[0] || null;
	},

	async create(data: StudyDateLesson): Promise<string> {
		const { study_date_id, lesson_id } = data;

		await pool.query(
			`INSERT INTO study_date_lessons (study_date_id, lesson_id)
			 VALUES (?, ?)`,
			[study_date_id, lesson_id],
		);

		const [rows] = await pool.query(
			`SELECT id FROM study_date_lessons
			 WHERE study_date_id = ? AND lesson_id = ?
			 ORDER BY id DESC LIMIT 1`,
			[study_date_id, lesson_id],
		);

		return (rows as any)[0].id;
	},

	async update(id: string, data: Partial<StudyDateLesson>): Promise<void> {
		const fields = Object.keys(data)
			.map((k) => `${k} = ?`)
			.join(", ");
		const values = Object.values(data);
		await pool.query(`UPDATE study_date_lessons SET ${fields} WHERE id = ?`, [...values, id]);
	},

	async delete(id: string): Promise<void> {
		await pool.query("DELETE FROM study_date_lessons WHERE id = ?", [id]);
	},

	async countFiltered(study_date_id?: string, lesson_id?: string): Promise<number> {
		let sql = "SELECT COUNT(*) as total FROM study_date_lessons WHERE 1=1";
		const params: any[] = [];

		if (study_date_id) {
			sql += " AND study_date_id = ?";
			params.push(study_date_id);
		}
		if (lesson_id) {
			sql += " AND lesson_id = ?";
			params.push(lesson_id);
		}

		const [rows] = await pool.query(sql, params);
		return (rows as any)[0].total || 0;
	},

	async getFiltered(options: { study_date_id?: string; lesson_id?: string; page?: number; limit?: number }): Promise<StudyDateLesson[]> {
		let sql = "SELECT * FROM study_date_lessons WHERE 1=1";
		const params: any[] = [];

		if (options.study_date_id) {
			sql += " AND study_date_id = ?";
			params.push(options.study_date_id);
		}
		if (options.lesson_id) {
			sql += " AND lesson_id = ?";
			params.push(options.lesson_id);
		}

		if (options.page && options.limit) {
			sql += " LIMIT ? OFFSET ?";
			params.push(options.limit, (options.page - 1) * options.limit);
		}

		const [rows] = await pool.query(sql, params);
		return rows as StudyDateLesson[];
	},
};
