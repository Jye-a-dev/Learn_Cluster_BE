import { db as pool } from "../../config/db.js";
export const NoteModel = {
    async getAll() {
        const [rows] = await pool.query("SELECT * FROM notes");
        return rows;
    },
    async getById(id) {
        const [rows] = await pool.query("SELECT * FROM notes WHERE id = ?", [id]);
        return rows[0] || null;
    },
    async getByUser(user_id) {
        const [rows] = await pool.query("SELECT * FROM notes WHERE user_id = ?", [user_id]);
        return rows;
    },
    async create(note) {
        const { user_id, lesson_id, content } = note;
        const [result] = await pool.query("INSERT INTO notes (user_id, lesson_id, content) VALUES (?, ?, ?)", [user_id, lesson_id, content || null]);
        // nếu id là UUID do DB tự generate (DEFAULT uuid())
        return result.insertId || "";
    },
    async update(id, data) {
        const fields = Object.keys(data)
            .map((k) => `${k} = ?`)
            .join(", ");
        const values = Object.values(data);
        await pool.query(`UPDATE notes SET ${fields} WHERE id = ?`, [...values, id]);
    },
    async delete(id) {
        await pool.query("DELETE FROM notes WHERE id = ?", [id]);
    },
    async count() {
        const [rows] = await pool.query("SELECT COUNT(*) as total FROM notes");
        return rows[0].total || 0;
    },
    async getByLesson(lesson_id) {
        const [rows] = await pool.query("SELECT * FROM notes WHERE lesson_id = ?", [lesson_id]);
        return rows;
    },
};
