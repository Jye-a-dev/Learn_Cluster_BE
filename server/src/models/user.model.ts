// src/models/user.model.ts
import type { User } from "../@types/user.js";
import { db as pool } from "../config/db.js";
const DEFAULT_ROLE_ID = "879d3f96-ebd2-11f0-b513-acf23c8aac4e";
export const UserModel = {
	async getAll(): Promise<User[]> {
		const [rows] = await pool.query("SELECT * FROM users");
		return rows as User[];
	},

	async getById(id: string): Promise<User | null> {
		const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
		return (rows as User[])[0] || null;
	},

	async getFullById(id: string): Promise<any | null> {
		const [rows] = await pool.query(
			`
      SELECT u.*, r.name AS role_name,
        (SELECT COUNT(*) FROM enrollments e WHERE e.user_id = u.id) AS enrollments_count,
        (SELECT COUNT(*) FROM study_dates s WHERE s.created_by = u.id) AS study_dates_count,
        (SELECT COUNT(*) FROM submissions sub WHERE sub.student_id = u.id) AS submissions_count,
        (SELECT COUNT(*) FROM notes n WHERE n.user_id = u.id) AS notes_count,
        (SELECT COUNT(*) FROM bookmarks b WHERE b.user_id = u.id) AS bookmarks_count,
        (SELECT COUNT(*) FROM achievements a WHERE a.user_id = u.id) AS achievements_count
      FROM users u
      LEFT JOIN roles r ON u.role_id = r.id
      WHERE u.id = ?
    `,
			[id],
		);
		return (rows as any[])[0] || null;
	},

	async create(user: Partial<User>): Promise<string> {
		const { username, email, password_hash } = user;

		const [result] = await pool.query(
			`
    INSERT INTO users (username, email, password_hash, role_id)
    VALUES (?, ?, ?, ?)
    `,
			[username, email, password_hash, DEFAULT_ROLE_ID],
		);

		return (result as any).insertId;
	},

	async update(id: string, data: Partial<User>): Promise<User | null> {
		const fields = Object.keys(data)
			.map((k) => `${k} = ?`)
			.join(", ");
		const values = Object.values(data);

		await pool.query(`UPDATE users SET ${fields} WHERE id = ?`, [...values, id]);

		// ⬅️ lấy user mới sau update
		const [rows] = await pool.query(
			`
    SELECT u.*, r.name AS role_name
    FROM users u
    LEFT JOIN roles r ON u.role_id = r.id
    WHERE u.id = ?
    `,
			[id],
		);

		return (rows as any[])[0] || null;
	},

	async delete(id: string): Promise<void> {
		await pool.query("DELETE FROM users WHERE id = ?", [id]);
	},

	async count(): Promise<number> {
		const [rows] = await pool.query("SELECT COUNT(*) as total FROM users");
		return (rows as any)[0].total || 0;
	},
	async getByRole(role_id: number): Promise<User[]> {
		const [rows] = await pool.query("SELECT * FROM users WHERE role_id = ?", [role_id]);
		return rows as User[];
	},

	async countByRole(role_id: number): Promise<number> {
		const [rows] = await pool.query("SELECT COUNT(*) as total FROM users WHERE role_id = ?", [role_id]);
		return (rows as any)[0].total || 0;
	},

	async search(q: string): Promise<User[]> {
		const like = `%${q}%`;
		const [rows] = await pool.query("SELECT * FROM users WHERE username LIKE ? OR email LIKE ?", [like, like]);
		return rows as User[];
	},
};
