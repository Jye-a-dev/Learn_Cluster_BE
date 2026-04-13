import { db as pool } from "../../config/db.js";
export const AssignmentModel = {
    async getAll(query) {
        let sql = "SELECT * FROM assignments WHERE 1=1";
        const values = [];
        if (query?.course_id) {
            sql += " AND course_id = ?";
            values.push(query.course_id);
        }
        if (query?.deadline_before) {
            sql += " AND deadline <= ?";
            values.push(query.deadline_before);
        }
        if (query?.limit) {
            sql += " LIMIT ?";
            values.push(Number(query.limit));
            if (query?.page) {
                sql += " OFFSET ?";
                values.push((Number(query.page) - 1) * Number(query.limit));
            }
        }
        const [rows] = await pool.query(sql, values);
        return rows;
    },
    async getById(id) {
        const [rows] = await pool.query("SELECT * FROM assignments WHERE id = ?", [id]);
        return rows[0] || null;
    },
    async getByCourse(course_id) {
        const [rows] = await pool.query("SELECT * FROM assignments WHERE course_id = ?", [course_id]);
        return rows;
    },
    async create(data) {
        const { course_id, title, description, file_url, deadline } = data;
        const [result] = await pool.query("INSERT INTO assignments (course_id, title, description, file_url, deadline) VALUES (?, ?, ?, ?, ?)", [course_id, title || null, description || null, file_url || null, deadline || null]);
        return result.insertId;
    },
    async update(id, data) {
        const fields = Object.keys(data).map((k) => `${k} = ?`).join(", ");
        const values = Object.values(data);
        await pool.query(`UPDATE assignments SET ${fields} WHERE id = ?`, [...values, id]);
    },
    async delete(id) {
        await pool.query("DELETE FROM assignments WHERE id = ?", [id]);
    },
    async deleteByCourse(course_id) {
        await pool.query("DELETE FROM assignments WHERE course_id = ?", [course_id]);
    },
    async count() {
        const [rows] = await pool.query("SELECT COUNT(*) as total FROM assignments");
        return rows[0].total || 0;
    },
};
