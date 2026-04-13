import { db as pool } from "../../config/db.js";
export const PermissionModel = {
    async getAll(page, limit, keyword) {
        let sql = "SELECT * FROM permissions";
        const params = [];
        if (keyword) {
            sql += " WHERE name LIKE ?";
            params.push(`%${keyword}%`);
        }
        sql += " ORDER BY id DESC";
        if (typeof limit === "number" && limit > 0) {
            sql += " LIMIT ?";
            params.push(limit);
        }
        const [rows] = await pool.query(sql, params);
        return rows;
    },
    async getById(id) {
        const [rows] = await pool.query("SELECT * FROM permissions WHERE id = ?", [id]);
        return rows[0] ?? null;
    },
    async create(data) {
        const { name, description } = data;
        const [result] = await pool.query("INSERT INTO permissions (name, description) VALUES (?, ?)", [name, description ?? null]);
        return result.insertId;
    },
    async update(id, data) {
        if (!Object.keys(data).length)
            return;
        const fields = Object.keys(data)
            .map((k) => `${k} = ?`)
            .join(", ");
        const values = Object.values(data);
        await pool.query(`UPDATE permissions SET ${fields} WHERE id = ?`, [...values, id]);
    },
    async delete(id) {
        await pool.query("DELETE FROM permissions WHERE id = ?", [id]);
    },
    async count() {
        const [rows] = await pool.query("SELECT COUNT(*) AS total FROM permissions");
        return rows[0]?.total ?? 0;
    },
};
