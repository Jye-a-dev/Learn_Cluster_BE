// src/models/note.model.ts
import type { Note } from "../@types/note.js";
import { db as pool } from "../config/db.js";

export const NoteModel = {
	async getAll(): Promise<Note[]> {
		const [rows] = await pool.query("SELECT * FROM notes");
		return rows as Note[];
	},

	async getById(id: string): Promise<Note | null> {
		const [rows] = await pool.query(
			"SELECT * FROM notes WHERE id = ?",
			[id]
		);
		return (rows as Note[])[0] || null;
	},

	async getByUser(user_id: string): Promise<Note[]> {
		const [rows] = await pool.query(
			"SELECT * FROM notes WHERE user_id = ?",
			[user_id]
		);
		return rows as Note[];
	},

	async create(note: Partial<Note>): Promise<string> {
		const { user_id, lesson_id, content } = note;

		const [result] = await pool.query(
			"INSERT INTO notes (user_id, lesson_id, content) VALUES (?, ?, ?)",
			[user_id, lesson_id, content || null]
		);

		// nếu id là UUID do DB tự generate (DEFAULT uuid())
		return (result as any).insertId || "";
	},

	async update(id: string, data: Partial<Note>): Promise<void> {
		const fields = Object.keys(data)
			.map((k) => `${k} = ?`)
			.join(", ");

		const values = Object.values(data);

		await pool.query(
			`UPDATE notes SET ${fields} WHERE id = ?`,
			[...values, id]
		);
	},

	async delete(id: string): Promise<void> {
		await pool.query("DELETE FROM notes WHERE id = ?", [id]);
	},

	async count(): Promise<number> {
		const [rows] = await pool.query(
			"SELECT COUNT(*) as total FROM notes"
		);
		return (rows as any)[0].total || 0;
	},

	async getByLesson(lesson_id: string): Promise<Note[]> {
		const [rows] = await pool.query(
			"SELECT * FROM notes WHERE lesson_id = ?",
			[lesson_id]
		);
		return rows as Note[];
	},
};
