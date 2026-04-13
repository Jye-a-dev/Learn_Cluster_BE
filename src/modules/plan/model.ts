import type { Plan } from "../plan/types.js";
import { db as pool } from "../../config/db.js";

export const PlanModel = {
	async getAll(): Promise<Plan[]> {
		const [rows] = await pool.query("SELECT * FROM plans");
		return rows as Plan[];
	},

	async getById(id: string): Promise<Plan | null> {
		const [rows] = await pool.query(
			"SELECT * FROM plans WHERE id = ?",
			[id]
		);
		return (rows as Plan[])[0] || null;
	},

	async create(plan: Partial<Plan>): Promise<string> {
		const { name, description, price, duration_days, is_active } = plan;

		await pool.query(
			`INSERT INTO plans (name, description, price, duration_days, is_active)
			 VALUES (?, ?, ?, ?, ?)`,
			[
				name,
				description || null,
				price,
				duration_days || null,
				is_active ?? true,
			]
		);

		// vì id là UUID do DB tự generate
		const [rows] = await pool.query(
			"SELECT id FROM plans WHERE name = ? ORDER BY created_at DESC LIMIT 1",
			[name]
		);

		return (rows as Plan[])[0]?.id || "";
	},

	async update(id: string, data: Partial<Plan>): Promise<void> {
		const fields = Object.keys(data)
			.map((k) => `${k} = ?`)
			.join(", ");

		const values = Object.values(data);

		await pool.query(
			`UPDATE plans SET ${fields} WHERE id = ?`,
			[...values, id]
		);
	},

	async delete(id: string): Promise<void> {
		await pool.query("DELETE FROM plans WHERE id = ?", [id]);
	},

	async count(): Promise<number> {
		const [rows] = await pool.query(
			"SELECT COUNT(*) as total FROM plans"
		);
		return (rows as any)[0].total || 0;
	},
};