// src/models/bookmark.model.ts
import type { Bookmark } from "../@types/bookmark.js";
import { db as pool } from "../config/db.js";

export const BookmarkModel = {
	async getAll(): Promise<Bookmark[]> {
		const [rows] = await pool.query("SELECT * FROM bookmarks");
		return rows as Bookmark[];
	},

	async getById(id: string): Promise<Bookmark | null> {
		const [rows] = await pool.query(
			"SELECT * FROM bookmarks WHERE id = ?",
			[id]
		);
		return (rows as Bookmark[])[0] || null;
	},

	async getByUser(user_id: string): Promise<Bookmark[]> {
		const [rows] = await pool.query(
			"SELECT * FROM bookmarks WHERE user_id = ?",
			[user_id]
		);
		return rows as Bookmark[];
	},

	async getByLesson(lesson_id: string): Promise<Bookmark[]> {
		const [rows] = await pool.query(
			"SELECT * FROM bookmarks WHERE lesson_id = ?",
			[lesson_id]
		);
		return rows as Bookmark[];
	},

	async create(bookmark: Partial<Bookmark>): Promise<string> {
		const { user_id, lesson_id } = bookmark;

		const [result] = await pool.query(
			"INSERT INTO bookmarks (user_id, lesson_id) VALUES (?, ?)",
			[user_id, lesson_id]
		);

		// vì id là UUID DEFAULT trong DB → không dùng insertId
		const [rows] = await pool.query(
			"SELECT id FROM bookmarks WHERE user_id = ? AND lesson_id = ?",
			[user_id, lesson_id]
		);

		return (rows as any)[0].id;
	},

	async update(id: string, data: Partial<Bookmark>): Promise<void> {
		const fields: string[] = [];
		const values: any[] = [];

		if (data.lesson_id !== undefined) {
			fields.push("lesson_id = ?");
			values.push(data.lesson_id);
		}

		if (fields.length === 0) return;

		values.push(id);

		await pool.query(
			`UPDATE bookmarks SET ${fields.join(", ")} WHERE id = ?`,
			values
		);
	},

	async delete(id: string): Promise<void> {
		await pool.query("DELETE FROM bookmarks WHERE id = ?", [id]);
	},

	async deleteByUserLesson(user_id: string, lesson_id: string): Promise<void> {
		await pool.query(
			"DELETE FROM bookmarks WHERE user_id = ? AND lesson_id = ?",
			[user_id, lesson_id]
		);
	},

	async count(): Promise<number> {
		const [rows] = await pool.query(
			"SELECT COUNT(*) as total FROM bookmarks"
		);
		return (rows as any)[0].total || 0;
	},
};
