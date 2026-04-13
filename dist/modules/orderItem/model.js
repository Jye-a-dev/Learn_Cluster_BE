import { db as pool } from "../../config/db.js";
export const OrderItemModel = {
    async getAll() {
        const [rows] = await pool.query("SELECT * FROM order_items");
        return rows;
    },
    async getById(id) {
        const [rows] = await pool.query("SELECT * FROM order_items WHERE id = ?", [id]);
        return rows[0] || null;
    },
    async getByOrder(order_id) {
        const [rows] = await pool.query("SELECT * FROM order_items WHERE order_id = ?", [order_id]);
        return rows;
    },
    async create(item) {
        const { order_id, item_type, item_id, price } = item;
        await pool.query(`INSERT INTO order_items (order_id, item_type, item_id, price)
			 VALUES (?, ?, ?, ?)`, [order_id, item_type, item_id, price]);
        const [rows] = await pool.query(`SELECT id FROM order_items 
			 WHERE order_id = ? 
			 ORDER BY id DESC LIMIT 1`, [order_id]);
        return rows[0]?.id || "";
    },
    async update(id, data) {
        const fields = Object.keys(data)
            .map((k) => `${k} = ?`)
            .join(", ");
        const values = Object.values(data);
        await pool.query(`UPDATE order_items SET ${fields} WHERE id = ?`, [...values, id]);
    },
    async delete(id) {
        await pool.query("DELETE FROM order_items WHERE id = ?", [id]);
    },
    async count() {
        const [rows] = await pool.query("SELECT COUNT(*) as total FROM order_items");
        return rows[0].total || 0;
    },
};
