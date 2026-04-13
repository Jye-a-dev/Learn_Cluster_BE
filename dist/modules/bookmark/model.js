import { db as pool } from "../../config/db.js";
export const BookmarkModel = {
    async getAll() {
        const [rows] = await pool.query("SELECT * FROM bookmarks");
        return rows;
    },
    async getById(id) {
        const [rows] = await pool.query("SELECT * FROM bookmarks WHERE id = ?", [id]);
        return rows[0] || null;
    },
    async getByUser(user_id) {
        const [rows] = await pool.query("SELECT * FROM bookmarks WHERE user_id = ?", [user_id]);
        return rows;
    },
    async getByLesson(lesson_id) {
        const [rows] = await pool.query("SELECT * FROM bookmarks WHERE lesson_id = ?", [lesson_id]);
        return rows;
    },
    async create(bookmark) {
        const { user_id, lesson_id } = bookmark;
        const [result] = await pool.query("INSERT INTO bookmarks (user_id, lesson_id) VALUES (?, ?)", [user_id, lesson_id]);
        // vì id là UUID DEFAULT trong DB → không dùng insertId
        const [rows] = await pool.query("SELECT id FROM bookmarks WHERE user_id = ? AND lesson_id = ?", [user_id, lesson_id]);
        return rows[0].id;
    },
    async update(id, data) {
        const fields = [];
        const values = [];
        if (data.lesson_id !== undefined) {
            fields.push("lesson_id = ?");
            values.push(data.lesson_id);
        }
        if (fields.length === 0)
            return;
        values.push(id);
        await pool.query(`UPDATE bookmarks SET ${fields.join(", ")} WHERE id = ?`, values);
    },
    async delete(id) {
        await pool.query("DELETE FROM bookmarks WHERE id = ?", [id]);
    },
    async deleteByUserLesson(user_id, lesson_id) {
        await pool.query("DELETE FROM bookmarks WHERE user_id = ? AND lesson_id = ?", [user_id, lesson_id]);
    },
    async count() {
        const [rows] = await pool.query("SELECT COUNT(*) as total FROM bookmarks");
        return rows[0].total || 0;
    },
};
