import type { StudyProfile } from "./study_profile.js";
import { db as pool } from "../../config/db.js";

export const StudyProfileModel = {
	async getAll(query?: any): Promise<StudyProfile[]> {
		let sql = "SELECT * FROM study_profiles WHERE 1=1";
		const values: any[] = [];

		if (query?.user_id) {
			sql += " AND user_id = ?";
			values.push(query.user_id);
		}

		if (query?.level) {
			sql += " AND level = ?";
			values.push(query.level);
		}

		if (query?.is_active !== undefined) {
			sql += " AND is_active = ?";
			values.push(query.is_active);
		}

		if (query?.limit) {
			sql += " LIMIT ?";
			values.push(Number(query.limit));

			if (query?.page) {
				sql += " OFFSET ?";
				values.push((Number(query.page) - 1) * Number(query.limit));
			}
		}

		const [rows] = await pool.query(sql, values);
		return rows as StudyProfile[];
	},

	async getById(id: string): Promise<StudyProfile | null> {
		const [rows] = await pool.query("SELECT * FROM study_profiles WHERE id = ?", [id]);
		return (rows as StudyProfile[])[0] || null;
	},

	async getByUserId(user_id: string): Promise<StudyProfile | null> {
		const [rows] = await pool.query("SELECT * FROM study_profiles WHERE user_id = ?", [user_id]);
		return (rows as StudyProfile[])[0] || null;
	},

	async create(data: Partial<StudyProfile>): Promise<string> {
		const { user_id, bio, preferred_subject, level, learning_goal, available_time, is_active } = data;

		const [result] = await pool.query(
			`INSERT INTO study_profiles 
			(user_id, bio, preferred_subject, level, learning_goal, available_time, is_active)
			VALUES (?, ?, ?, ?, ?, ?, ?)`,
			[
				user_id,
				bio || null,
				preferred_subject || null,
				level || null,
				learning_goal || null,
				available_time ? JSON.stringify(available_time) : null,
				is_active ?? true,
			],
		);

		return (result as any).insertId;
	},

	async update(id: string, data: Partial<StudyProfile>): Promise<void> {
		const clone: any = {};

		for (const key in data) {
			if (data[key as keyof StudyProfile] !== undefined) {
				clone[key] = data[key as keyof StudyProfile];
			}
		}

		if ("available_time" in clone) {
			clone.available_time = clone.available_time !== null ? JSON.stringify(clone.available_time) : null;
		}

		const fields = Object.keys(clone)
			.map((k) => `${k} = ?`)
			.join(", ");

		if (!fields) return;

		const values = Object.values(clone);

		await pool.query(`UPDATE study_profiles SET ${fields} WHERE id = ?`, [...values, id]);
	},

	async delete(id: string): Promise<void> {
		await pool.query("DELETE FROM study_profiles WHERE id = ?", [id]);
	},

	async count(): Promise<number> {
		const [rows] = await pool.query("SELECT COUNT(*) as total FROM study_profiles");
		return (rows as any)[0].total || 0;
	},
};
