import type { Message } from "../@types/message.js";
import { db as pool } from "../config/db.js";

export const MessageModel = {
	async getByStudyDate(study_date_id: number): Promise<Message[]> {
		const [rows] = await pool.query(
			`SELECT * FROM messages
			 WHERE study_date_id = ?
			 ORDER BY sent_at ASC`,
			[study_date_id]
		);
		return rows as Message[];
	},

	async getAll(): Promise<Message[]> {
		const [rows] = await pool.query(
			"SELECT * FROM messages ORDER BY sent_at DESC"
		);
		return rows as Message[];
	},

	async getById(id: number): Promise<Message | null> {
		const [rows] = await pool.query(
			"SELECT * FROM messages WHERE id = ?",
			[id]
		);
		return (rows as Message[])[0] ?? null;
	},

	async create(data: Partial<Message>): Promise<number> {
		const { study_date_id, sender_id, content } = data;

		const [result] = await pool.query(
			`INSERT INTO messages (study_date_id, sender_id, content)
			 VALUES (?, ?, ?)`,
			[study_date_id, sender_id ?? null, content ?? null]
		);

		return (result as any).insertId;
	},

	async delete(id: number): Promise<void> {
		await pool.query(
			"DELETE FROM messages WHERE id = ?",
			[id]
		);
	},
};
