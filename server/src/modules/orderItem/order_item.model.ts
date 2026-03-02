import type { OrderItem } from "../orderItem/order_item.js";
import { db as pool } from "../../config/db.js";

export const OrderItemModel = {
	async getAll(): Promise<OrderItem[]> {
		const [rows] = await pool.query("SELECT * FROM order_items");
		return rows as OrderItem[];
	},

	async getById(id: string): Promise<OrderItem | null> {
		const [rows] = await pool.query(
			"SELECT * FROM order_items WHERE id = ?",
			[id]
		);
		return (rows as OrderItem[])[0] || null;
	},

	async getByOrder(order_id: string): Promise<OrderItem[]> {
		const [rows] = await pool.query(
			"SELECT * FROM order_items WHERE order_id = ?",
			[order_id]
		);
		return rows as OrderItem[];
	},

	async create(item: Partial<OrderItem>): Promise<string> {
		const { order_id, item_type, item_id, price } = item;

		await pool.query(
			`INSERT INTO order_items (order_id, item_type, item_id, price)
			 VALUES (?, ?, ?, ?)`,
			[order_id, item_type, item_id, price]
		);

		const [rows] = await pool.query(
			`SELECT id FROM order_items 
			 WHERE order_id = ? 
			 ORDER BY id DESC LIMIT 1`,
			[order_id]
		);

		return (rows as OrderItem[])[0]?.id || "";
	},

	async update(id: string, data: Partial<OrderItem>): Promise<void> {
		const fields = Object.keys(data)
			.map((k) => `${k} = ?`)
			.join(", ");

		const values = Object.values(data);

		await pool.query(
			`UPDATE order_items SET ${fields} WHERE id = ?`,
			[...values, id]
		);
	},

	async delete(id: string): Promise<void> {
		await pool.query("DELETE FROM order_items WHERE id = ?", [id]);
	},

	async count(): Promise<number> {
		const [rows] = await pool.query(
			"SELECT COUNT(*) as total FROM order_items"
		);
		return (rows as any)[0].total || 0;
	},
};