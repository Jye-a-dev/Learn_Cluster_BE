import { db as pool } from "../../config/db.js";
export const PaymentModel = {
    async getAll() {
        const [rows] = await pool.query("SELECT * FROM payments");
        return rows;
    },
    async getById(id) {
        const [rows] = await pool.query("SELECT * FROM payments WHERE id = ?", [id]);
        return rows[0] || null;
    },
    async getByOrder(order_id) {
        const [rows] = await pool.query("SELECT * FROM payments WHERE order_id = ?", [order_id]);
        return rows;
    },
    async create(data) {
        const { order_id, provider, transaction_code, amount, status, paid_at, raw_response } = data;
        await pool.query(`INSERT INTO payments
			(order_id, provider, transaction_code, amount, status, paid_at, raw_response)
			VALUES (?, ?, ?, ?, ?, ?, ?)`, [
            order_id,
            provider || null,
            transaction_code || null,
            amount || null,
            status || "pending",
            paid_at || null,
            raw_response ? JSON.stringify(raw_response) : null,
        ]);
        const [rows] = await pool.query(`SELECT id FROM payments
			 WHERE order_id = ?
			 ORDER BY id DESC LIMIT 1`, [order_id]);
        return rows[0]?.id || "";
    },
    async update(id, data) {
        if (!data || Object.keys(data).length === 0)
            return;
        const fields = Object.keys(data)
            .map((k) => `${k} = ?`)
            .join(", ");
        const values = Object.values(data).map((v) => {
            if (v === null || v === undefined)
                return null;
            if (v instanceof Date) {
                return v.toISOString().slice(0, 19).replace("T", " ");
            }
            // JSON object (raw_response)
            if (typeof v === "object") {
                return JSON.stringify(v);
            }
            return v;
        });
        await pool.query(`UPDATE payments SET ${fields} WHERE id = ?`, [...values, id]);
    },
    async delete(id) {
        await pool.query("DELETE FROM payments WHERE id = ?", [id]);
    },
    async count() {
        const [rows] = await pool.query("SELECT COUNT(*) as total FROM payments");
        return rows[0].total || 0;
    },
};
