import { db as pool } from "../../config/db.js";
export const OrderModel = {
    async getAll() {
        const [rows] = await pool.query("SELECT * FROM orders");
        return rows;
    },
    async getById(id) {
        const [rows] = await pool.query("SELECT * FROM orders WHERE id = ?", [id]);
        return rows[0] || null;
    },
    async getByUser(user_id) {
        const [rows] = await pool.query("SELECT * FROM orders WHERE user_id = ?", [user_id]);
        return rows;
    },
    async create(order) {
        const { user_id, total_amount, status } = order;
        await pool.query(`INSERT INTO orders (user_id, total_amount, status)
			 VALUES (?, ?, ?)`, [user_id, total_amount, status || "pending"]);
        // lấy id vừa tạo (UUID do DB generate)
        const [rows] = await pool.query(`SELECT id FROM orders 
			 WHERE user_id = ? 
			 ORDER BY created_at DESC LIMIT 1`, [user_id]);
        return rows[0]?.id || "";
    },
    async update(id, data) {
        const fields = Object.keys(data)
            .map((k) => `${k} = ?`)
            .join(", ");
        const values = Object.values(data);
        await pool.query(`UPDATE orders SET ${fields} WHERE id = ?`, [...values, id]);
    },
    async delete(id) {
        await pool.query("DELETE FROM orders WHERE id = ?", [id]);
    },
    async count() {
        const [rows] = await pool.query("SELECT COUNT(*) as total FROM orders");
        return rows[0].total || 0;
    },
};
