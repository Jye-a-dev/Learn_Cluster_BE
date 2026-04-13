import { db as pool } from "../../config/db.js";
export const SubmissionModel = {
    async getAll() {
        const [rows] = await pool.query("SELECT * FROM submissions");
        return rows;
    },
    async getById(id) {
        const [rows] = await pool.query("SELECT * FROM submissions WHERE id = ?", [id]);
        return rows[0] || null;
    },
    async create(data) {
        const { assignment_id, student_id, file_url, text_submission } = data;
        const [result] = await pool.query("INSERT INTO submissions (assignment_id, student_id, file_url, text_submission) VALUES (?, ?, ?, ?)", [
            assignment_id,
            student_id,
            file_url || null,
            text_submission || null,
        ]);
        return result.insertId;
    },
    async update(id, data) {
        const fields = Object.keys(data)
            .map((k) => `${k} = ?`)
            .join(", ");
        const values = Object.values(data);
        await pool.query(`UPDATE submissions SET ${fields} WHERE id = ?`, [...values, id]);
    },
    async delete(id) {
        await pool.query("DELETE FROM submissions WHERE id = ?", [id]);
    },
    async count() {
        const [rows] = await pool.query("SELECT COUNT(*) as total FROM submissions");
        return rows[0].total || 0;
    },
    async getByAssignment(assignment_id) {
        const [rows] = await pool.query("SELECT * FROM submissions WHERE assignment_id = ?", [assignment_id]);
        return rows;
    },
    async countByAssignment(assignment_id) {
        const [rows] = await pool.query("SELECT COUNT(*) AS total FROM submissions WHERE assignment_id = ?", [assignment_id]);
        return rows[0].total || 0;
    },
    async getByStudent(student_id) {
        const [rows] = await pool.query("SELECT * FROM submissions WHERE student_id = ?", [student_id]);
        return rows;
    },
    async countByStudent(student_id) {
        const [rows] = await pool.query("SELECT COUNT(*) AS total FROM submissions WHERE student_id = ?", [student_id]);
        return rows[0].total || 0;
    },
    async getByAssignmentAndStudent(assignment_id, student_id) {
        const [rows] = await pool.query("SELECT * FROM submissions WHERE assignment_id = ? AND student_id = ?", [assignment_id, student_id]);
        return rows[0] || null;
    },
};
