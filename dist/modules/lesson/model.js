import { db as pool } from "../../config/db.js";
export const LessonModel = {
    async getAll() {
        const [rows] = await pool.query("SELECT * FROM lessons");
        return rows;
    },
    async getById(id) {
        const [rows] = await pool.query("SELECT * FROM lessons WHERE id = ?", [id]);
        return rows[0] || null;
    },
    async create(lesson) {
        const { chapter_id, title, content_type, content_url, content_text, ordering } = lesson;
        const [result] = await pool.query(`INSERT INTO lessons 
     (chapter_id, title, content_type, content_url, content_text, ordering)
     VALUES (?, ?, ?, ?, ?, ?)`, [chapter_id, title, content_type, content_url ?? null, content_text ?? null, ordering]);
        return result.insertId;
    },
    async update(id, data) {
        const fields = Object.keys(data)
            .map((k) => `${k} = ?`)
            .join(", ");
        const values = Object.values(data);
        await pool.query(`UPDATE lessons SET ${fields} WHERE id = ?`, [...values, id]);
    },
    async delete(id) {
        await pool.query("DELETE FROM lessons WHERE id = ?", [id]);
    },
    async count() {
        const [rows] = await pool.query("SELECT COUNT(*) as total FROM lessons");
        return rows[0].total || 0;
    },
    // ===== EXTRA METHODS =====
    async getByChapter(chapter_id) {
        const [rows] = await pool.query("SELECT * FROM lessons WHERE chapter_id = ? ORDER BY ordering ASC", [chapter_id]);
        return rows;
    },
    async updateOrder(id, ordering) {
        await pool.query("UPDATE lessons SET ordering = ? WHERE id = ?", [ordering, id]);
    },
};
