import type { StudySwipe, SwipeStatus } from "./types.js";
import { db as pool } from "../../config/db.js";

export const StudySwipeModel = {
	async getAll(query?: any): Promise<StudySwipe[]> {
		let sql = "SELECT * FROM study_swipes WHERE 1=1";
		const values: any[] = [];

		if (query?.swiper_id) {
			sql += " AND swiper_id = ?";
			values.push(query.swiper_id);
		}

		if (query?.target_id) {
			sql += " AND target_id = ?";
			values.push(query.target_id);
		}

		if (query?.status) {
			sql += " AND status = ?";
			values.push(query.status);
		}

		sql += " ORDER BY created_at DESC";

		if (query?.limit) {
			sql += " LIMIT ?";
			values.push(Number(query.limit));

			if (query?.page) {
				sql += " OFFSET ?";
				values.push((Number(query.page) - 1) * Number(query.limit));
			}
		}

		const [rows] = await pool.query(sql, values);
		return rows as StudySwipe[];
	},

	async getById(id: string): Promise<StudySwipe | null> {
		const [rows] = await pool.query(
			"SELECT * FROM study_swipes WHERE id = ?",
			[id]
		);
		return (rows as StudySwipe[])[0] || null;
	},

	async getByUsers(swiper_id: string, target_id: string): Promise<StudySwipe | null> {
		const [rows] = await pool.query(
			`SELECT * FROM study_swipes 
			 WHERE swiper_id = ? AND target_id = ?`,
			[swiper_id, target_id]
		);
		return (rows as StudySwipe[])[0] || null;
	},

	async create(data: Partial<StudySwipe>): Promise<string> {
		const { swiper_id, target_id, status } = data;

		const [result] = await pool.query(
			`INSERT INTO study_swipes (swiper_id, target_id, status)
			 VALUES (?, ?, ?)`,
			[swiper_id, target_id, status || "pending"]
		);

		return (result as any).insertId;
	},

	async update(id: string, data: Partial<StudySwipe>): Promise<void> {
		const fields = Object.keys(data)
			.map((k) => `${k} = ?`)
			.join(", ");

		const values = Object.values(data);

		await pool.query(
			`UPDATE study_swipes SET ${fields} WHERE id = ?`,
			[...values, id]
		);
	},

	async delete(id: string): Promise<void> {
		await pool.query("DELETE FROM study_swipes WHERE id = ?", [id]);
	},

	async deleteByUsers(swiper_id: string, target_id: string): Promise<void> {
		await pool.query(
			`DELETE FROM study_swipes 
			 WHERE swiper_id = ? AND target_id = ?`,
			[swiper_id, target_id]
		);
	},

	async count(): Promise<number> {
		const [rows] = await pool.query(
			"SELECT COUNT(*) as total FROM study_swipes"
		);
		return (rows as any)[0].total || 0;
	},
};