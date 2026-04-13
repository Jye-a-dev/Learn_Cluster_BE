import { db as pool } from "../../config/db.js";
export const MessageModel = {
    async getByStudyDate(study_date_id) {
        const [rows] = await pool.query(`SELECT * FROM messages
       WHERE study_date_id = ?
       ORDER BY sent_at ASC`, [study_date_id]);
        return rows;
    },
    async getAll() {
        const [rows] = await pool.query("SELECT * FROM messages ORDER BY sent_at DESC");
        return rows;
    },
    async getById(id) {
        const [rows] = await pool.query("SELECT * FROM messages WHERE id = ?", [id]);
        return rows[0] ?? null;
    },
    async create(data) {
        const { study_date_id, sender_id, content } = data;
        const [result] = await pool.query(`INSERT INTO messages (study_date_id, sender_id, content)
     VALUES (?, ?, ?)`, [study_date_id, sender_id ?? null, content ?? null]);
        const [rows] = await pool.query(`SELECT id FROM messages WHERE id = LAST_INSERT_ID()`);
        return rows[0]?.id;
    },
    async delete(id) {
        await pool.query("DELETE FROM messages WHERE id = ?", [id]);
    },
    async count() {
        const [rows] = await pool.query("SELECT COUNT(*) as total FROM messages");
        return rows[0].total ?? 0;
    },
    async getBySender(sender_id) {
        const [rows] = await pool.query("SELECT * FROM messages WHERE sender_id = ? ORDER BY sent_at ASC", [sender_id]);
        return rows;
    },
    async update(id, data) {
        const fields = Object.keys(data)
            .map((k) => `${k} = ?`)
            .join(", ");
        const values = Object.values(data);
        await pool.query(`UPDATE messages SET ${fields} WHERE id = ?`, [...values, id]);
    },
};
