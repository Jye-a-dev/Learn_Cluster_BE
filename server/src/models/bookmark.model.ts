// src/models/bookmark.model.ts
import type { Bookmark } from "../@types/bookmark.js";
import { db as pool } from "../config/db.js";

export const BookmarkModel = {
	async getAll(): Promise<Bookmark[]> {
		const [rows] = await pool.query("SELECT * FROM bookmarks");
		return rows as Bookmark[];
	},

	async getById(id: number): Promise<Bookmark | null> {
		const [rows] = await pool.query("SELECT * FROM bookmarks WHERE id = ?", [id]);
		return (rows as Bookmark[])[0] || null;
	},

	async getByUser(user_id: string): Promise<Bookmark[]> {
		const [rows] = await pool.query("SELECT * FROM bookmarks WHERE user_id = ?", [user_id]);
		return rows as Bookmark[];
	},

	async create(bookmark: Partial<Bookmark>): Promise<number> {
		const { user_id, lesson_id } = bookmark;
		const [result] = await pool.query(
			"INSERT INTO bookmarks (user_id, lesson_id) VALUES (?, ?)",
			[user_id, lesson_id]
		);
		return (result as any).insertId;
	},

	async delete(id: number): Promise<void> {
		await pool.query("DELETE FROM bookmarks WHERE id = ?", [id]);
	},

	async count(): Promise<number> {
		const [rows] = await pool.query("SELECT COUNT(*) as total FROM bookmarks");
		return (rows as any)[0].total || 0;
	},
};
