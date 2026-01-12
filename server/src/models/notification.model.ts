import type { Notification } from "../@types/notification.js";
import { db as pool } from "../config/db.js";

export const NotificationModel = {
	/* ===== EXISTING ===== */

	async getByUser(user_id: string, query?: any): Promise<Notification[]> {
		const {
			page = 1,
			limit = 20,
			type,
			is_read,
		} = query || {};

		const offset = (page - 1) * limit;

		let sql = `
			SELECT * FROM notifications
			WHERE user_id = ?
		`;
		const params: any[] = [user_id];

		if (type) {
			sql += " AND type = ?";
			params.push(type);
		}

		if (typeof is_read === "boolean") {
			sql += " AND is_read = ?";
			params.push(is_read);
		}

		sql += `
			ORDER BY created_at DESC
			LIMIT ? OFFSET ?
		`;
		params.push(limit, offset);

		const [rows] = await pool.query(sql, params);
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

	/* ===== NEW ===== */

	async markAllAsRead(user_id: string): Promise<void> {
		await pool.query(
			"UPDATE notifications SET is_read = TRUE WHERE user_id = ?",
			[user_id]
		);
	},

	async getUnreadByUser(user_id: string): Promise<Notification[]> {
		const [rows] = await pool.query(
			`SELECT * FROM notifications
			 WHERE user_id = ? AND is_read = FALSE
			 ORDER BY created_at DESC`,
			[user_id]
		);
		return rows as Notification[];
	},

	async bulkMarkAsRead(ids: number[]): Promise<void> {
		if (ids.length === 0) return;

		await pool.query(
			`UPDATE notifications
			 SET is_read = TRUE
			 WHERE id IN (?)`,
			[ids]
		);
	},

	async deleteAllByUser(user_id: string): Promise<void> {
		await pool.query(
			"DELETE FROM notifications WHERE user_id = ?",
			[user_id]
		);
	},
};
