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
		const [rows] = await pool.query("SELECT * FROM messages ORDER BY sent_at DESC");
		return rows as Message[];
	},

	async getById(id: number): Promise<Message | null> {
		const [rows] = await pool.query("SELECT * FROM messages WHERE id = ?", [id]);
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
		await pool.query("DELETE FROM messages WHERE id = ?", [id]);
	},
	async count(): Promise<number> {
		const [rows] = await pool.query("SELECT COUNT(*) as total FROM messages");
		return (rows as any)[0].total ?? 0;
	},

	async getBySender(sender_id: string): Promise<Message[]> {
		const [rows] = await pool.query("SELECT * FROM messages WHERE sender_id = ? ORDER BY sent_at ASC", [sender_id]);
		return rows as Message[];
	},

	async update(id: number, data: Partial<Message>): Promise<void> {
		const fields = Object.keys(data)
			.map((k) => `${k} = ?`)
			.join(", ");
		const values = Object.values(data);
		await pool.query(`UPDATE messages SET ${fields} WHERE id = ?`, [...values, id]);
	},
};
