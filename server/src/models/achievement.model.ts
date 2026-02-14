// src/models/achievement.model.ts
import type { Achievement } from "../@types/achievement.js";
import { db as pool } from "../config/db.js";
import crypto from "crypto";

export const AchievementModel = {
	async getAll(): Promise<Achievement[]> {
		const [rows] = await pool.query("SELECT * FROM achievements");
		return rows as Achievement[];
	},

	async getById(id: string): Promise<Achievement | null> {
		const [rows] = await pool.query(
			"SELECT * FROM achievements WHERE id = ?",
			[id]
		);
		return (rows as Achievement[])[0] || null;
	},

	async getByUser(user_id: string): Promise<Achievement[]> {
		const [rows] = await pool.query(
			"SELECT * FROM achievements WHERE user_id = ?",
			[user_id]
		);
		return rows as Achievement[];
	},

	async create(achievement: Partial<Achievement>): Promise<string> {
		const { user_id, name, description } = achievement;

		const id = crypto.randomUUID();

		await pool.query(
			`INSERT INTO achievements (id, user_id, name, description)
			 VALUES (?, ?, ?, ?)`,
			[id, user_id, name, description ?? null]
		);

		return id;
	},

	async bulkCreate(achievements: Partial<Achievement>[]): Promise<void> {
		if (!achievements.length) return;

		const values = achievements.map((a) => [
			crypto.randomUUID(),
			a.user_id,
			a.name,
			a.description ?? null,
		]);

		await pool.query(
			`INSERT INTO achievements (id, user_id, name, description)
			 VALUES ?`,
			[values]
		);
	},

	async update(id: string, data: Partial<Achievement>): Promise<void> {
		const fields = Object.keys(data)
			.map((k) => `${k} = ?`)
			.join(", ");
		const values = Object.values(data);

		await pool.query(
			`UPDATE achievements SET ${fields} WHERE id = ?`,
			[...values, id]
		);
	},

	async delete(id: string): Promise<void> {
		await pool.query("DELETE FROM achievements WHERE id = ?", [id]);
	},

	async deleteByUser(user_id: string): Promise<void> {
		await pool.query("DELETE FROM achievements WHERE user_id = ?", [user_id]);
	},

	async count(): Promise<number> {
		const [rows] = await pool.query(
			"SELECT COUNT(*) as total FROM achievements"
		);
		return (rows as any)[0].total || 0;
	},
};
