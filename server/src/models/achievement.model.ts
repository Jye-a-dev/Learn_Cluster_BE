// src/models/achievement.model.ts
import type { Achievement } from "../@types/achievement.js";
import { db as pool } from "../config/db.js";

export const AchievementModel = {
	async getAll(): Promise<Achievement[]> {
		const [rows] = await pool.query("SELECT * FROM achievements");
		return rows as Achievement[];
	},

	async getById(id: number): Promise<Achievement | null> {
		const [rows] = await pool.query("SELECT * FROM achievements WHERE id = ?", [id]);
		return (rows as Achievement[])[0] || null;
	},

	async getByUser(user_id: string): Promise<Achievement[]> {
		const [rows] = await pool.query("SELECT * FROM achievements WHERE user_id = ?", [user_id]);
		return rows as Achievement[];
	},

	async create(achievement: Partial<Achievement>): Promise<number> {
		const { user_id, name, description } = achievement;
		const [result] = await pool.query(
			"INSERT INTO achievements (user_id, name, description) VALUES (?, ?, ?)",
			[user_id, name, description || null]
		);
		return (result as any).insertId;
	},

	async bulkCreate(achievements: Partial<Achievement>[]): Promise<void> {
		const values = achievements.map((a) => [
			a.user_id,
			a.name,
			a.description || null,
		]);
		await pool.query(
			"INSERT INTO achievements (user_id, name, description) VALUES ?",
			[values]
		);
	},

	async update(id: number, data: Partial<Achievement>): Promise<void> {
		const fields = Object.keys(data)
			.map((k) => `${k} = ?`)
			.join(", ");
		const values = Object.values(data);
		await pool.query(`UPDATE achievements SET ${fields} WHERE id = ?`, [...values, id]);
	},

	async delete(id: number): Promise<void> {
		await pool.query("DELETE FROM achievements WHERE id = ?", [id]);
	},

	async deleteByUser(user_id: string): Promise<void> {
		await pool.query("DELETE FROM achievements WHERE user_id = ?", [user_id]);
	},

	async count(): Promise<number> {
		const [rows] = await pool.query("SELECT COUNT(*) as total FROM achievements");
		return (rows as any)[0].total || 0;
	},
};
