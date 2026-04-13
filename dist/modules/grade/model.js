import { db as pool } from "../../config/db.js";
export const GradeModel = {
    async getAll() {
        const [rows] = await pool.query("SELECT * FROM grades");
        return rows;
    },
    async getById(id) {
        const [rows] = await pool.query("SELECT * FROM grades WHERE id = ?", [id]);
        return rows[0] || null;
    },
    async create(data) {
        const { submission_id, grader_id, score, feedback } = data;
        const [result] = await pool.query("INSERT INTO grades (submission_id, grader_id, score, feedback) VALUES (?, ?, ?, ?)", [
            submission_id,
            grader_id || null,
            score || null,
            feedback || null,
        ]);
        return result.insertId;
    },
    async update(id, data) {
        if (!data || Object.keys(data).length === 0)
            return;
        const fields = Object.keys(data)
            .map((k) => `${k} = ?`)
            .join(", ");
        const values = Object.values(data);
        await pool.query(`UPDATE grades SET ${fields} WHERE id = ?`, [...values, id]);
    },
    async delete(id) {
        await pool.query("DELETE FROM grades WHERE id = ?", [id]);
    },
    async count() {
        const [rows] = await pool.query("SELECT COUNT(*) as total FROM grades");
        return rows[0].total || 0;
    },
    // ===== EXTRA METHODS =====
    async getBySubmission(submission_id) {
        const [rows] = await pool.query("SELECT * FROM grades WHERE submission_id = ?", [submission_id]);
        return rows;
    },
    async getByGrader(grader_id) {
        const [rows] = await pool.query("SELECT * FROM grades WHERE grader_id = ?", [grader_id]);
        return rows;
    },
    async updateFeedback(id, feedback) {
        await pool.query("UPDATE grades SET feedback = ? WHERE id = ?", [feedback, id]);
    },
    async getTop(n) {
        const [rows] = await pool.query("SELECT * FROM grades ORDER BY score DESC LIMIT ?", [n]);
        return rows;
    },
};
