import type { Notification } from "../@types/notification.js";
import { db as pool } from "../config/db.js";

export const NotificationModel = {
	async getByUser(user_id: string): Promise<Notification[]> {
		const [rows] = await pool.query(
			`SELECT * FROM notifications
			 WHERE user_id = ?
			 ORDER BY created_at DESC`,
			[user_id]
		);
		return rows as Notification[];
	},

	async getAll(): Promise<Notification[]> {
		const [rows] = await pool.query(
			"SELECT * FROM notifications ORDER BY created_at DESC"
		);
		return rows as Notification[];
	},

	async getById(id: number): Promise<Notification | null> {
		const [rows] = await pool.query(
			"SELECT * FROM notifications WHERE id = ?",
			[id]
		);
		return (rows as Notification[])[0] ?? null;
	},

	async create(data: Partial<Notification>): Promise<number> {
		const { user_id, type, content } = data;

		const [result] = await pool.query(
			`INSERT INTO notifications (user_id, type, content)
			 VALUES (?, ?, ?)`,
			[user_id, type ?? null, content ?? null]
		);

		return (result as any).insertId;
	},

	async markAsRead(id: number): Promise<void> {
		await pool.query(
			"UPDATE notifications SET is_read = TRUE WHERE id = ?",
			[id]
		);
	},

	async delete(id: number): Promise<void> {
		await pool.query(
			"DELETE FROM notifications WHERE id = ?",
			[id]
		);
	},

	async countUnread(user_id: string): Promise<number> {
		const [rows] = await pool.query(
			`SELECT COUNT(*) AS total
			 FROM notifications
			 WHERE user_id = ? AND is_read = FALSE`,
			[user_id]
		);

		return (rows as any)[0]?.total ?? 0;
	},
};
