import { db as pool } from "../../config/db.js";
import crypto from "crypto";
export const AchievementModel = {
    async getAll() {
        const [rows] = await pool.query("SELECT * FROM achievements");
        return rows;
    },
    async getById(id) {
        const [rows] = await pool.query("SELECT * FROM achievements WHERE id = ?", [id]);
        return rows[0] || null;
    },
    async getByUser(user_id) {
        const [rows] = await pool.query("SELECT * FROM achievements WHERE user_id = ?", [user_id]);
        return rows;
    },
    async create(achievement) {
        const { user_id, name, description } = achievement;
        const id = crypto.randomUUID();
        await pool.query(`INSERT INTO achievements (id, user_id, name, description)
			 VALUES (?, ?, ?, ?)`, [id, user_id, name, description ?? null]);
        return id;
    },
    async bulkCreate(achievements) {
        if (!achievements.length)
            return;
        const values = achievements.map((a) => [
            crypto.randomUUID(),
            a.user_id,
            a.name,
            a.description ?? null,
        ]);
        await pool.query(`INSERT INTO achievements (id, user_id, name, description)
			 VALUES ?`, [values]);
    },
    async update(id, data) {
        const fields = Object.keys(data)
            .map((k) => `${k} = ?`)
            .join(", ");
        const values = Object.values(data);
        await pool.query(`UPDATE achievements SET ${fields} WHERE id = ?`, [...values, id]);
    },
    async delete(id) {
        await pool.query("DELETE FROM achievements WHERE id = ?", [id]);
    },
    async deleteByUser(user_id) {
        await pool.query("DELETE FROM achievements WHERE user_id = ?", [user_id]);
    },
    async count() {
        const [rows] = await pool.query("SELECT COUNT(*) as total FROM achievements");
        return rows[0].total || 0;
    },
};
