import { db as pool } from "../../config/db.js";
export const RoleModel = {
    async getAll() {
        const [rows] = await pool.query("SELECT * FROM roles");
        return rows;
    },
    async getById(id) {
        const [rows] = await pool.query("SELECT * FROM roles WHERE id = ?", [id]);
        return rows[0] || null;
    },
    async create(role) {
        const { name, description } = role;
        const [result] = await pool.query("INSERT INTO roles (name, description) VALUES (?, ?)", [name, description || null]);
        return result.insertId;
    },
    async update(id, data) {
        const fields = Object.keys(data)
            .map((k) => `${k} = ?`)
            .join(", ");
        const values = Object.values(data);
        await pool.query(`UPDATE roles SET ${fields} WHERE id = ?`, [...values, id]);
    },
    async delete(id) {
        await pool.query("DELETE FROM roles WHERE id = ?", [id]);
    },
    async count() {
        const [rows] = await pool.query("SELECT COUNT(*) AS total FROM roles");
        return rows[0].total || 0;
    },
};
