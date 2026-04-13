import { db as pool } from "../../config/db.js";
export const EnrollmentModel = {
    async getAll() {
        const [rows] = await pool.query("SELECT * FROM enrollments");
        return rows;
    },
    async getById(id) {
        const [rows] = await pool.query("SELECT * FROM enrollments WHERE id = ?", [id]);
        return rows[0] || null;
    },
    async getByUser(user_id) {
        const [rows] = await pool.query("SELECT * FROM enrollments WHERE user_id = ?", [user_id]);
        return rows;
    },
    async getByCourse(course_id) {
        const [rows] = await pool.query("SELECT * FROM enrollments WHERE course_id = ?", [course_id]);
        return rows;
    },
    async create(enrollment) {
        const { user_id, course_id } = enrollment;
        const [result] = await pool.query("INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)", [user_id, course_id]);
        return result.insertId;
    },
    async update(id, data) {
        const fields = Object.keys(data)
            .map((k) => `${k} = ?`)
            .join(", ");
        const values = Object.values(data);
        await pool.query(`UPDATE enrollments SET ${fields} WHERE id = ?`, [...values, id]);
    },
    async delete(id) {
        await pool.query("DELETE FROM enrollments WHERE id = ?", [id]);
    },
    async count() {
        const [rows] = await pool.query("SELECT COUNT(*) as total FROM enrollments");
        return rows[0].total || 0;
    },
    async countStudentByCourse(course_id) {
        const [rows] = await pool.query("SELECT COUNT(*) as total FROM enrollments WHERE course_id = ?", [course_id]);
        return rows[0].total || 0;
    },
    async countFiltered(user_id, course_id) {
        let sql = "SELECT COUNT(*) as total FROM enrollments WHERE 1=1";
        const params = [];
        if (user_id) {
            sql += " AND user_id = ?";
            params.push(user_id);
        }
        if (course_id) {
            sql += " AND course_id = ?";
            params.push(course_id);
        }
        const [rows] = await pool.query(sql, params);
        return rows[0].total || 0;
    },
    async getFiltered(options) {
        let sql = "SELECT * FROM enrollments WHERE 1=1";
        const params = [];
        if (options.user_id) {
            sql += " AND user_id = ?";
            params.push(options.user_id);
        }
        if (options.course_id) {
            sql += " AND course_id = ?";
            params.push(options.course_id);
        }
        sql += " ORDER BY enrolled_at DESC";
        if (options.page && options.limit) {
            const offset = (options.page - 1) * options.limit;
            sql += " LIMIT ? OFFSET ?";
            params.push(options.limit, offset);
        }
        const [rows] = await pool.query(sql, params);
        return rows;
    },
};
