import { db as pool } from "../../config/db.js";
export const ChapterModel = {
    async getAll(query) {
        let sql = "SELECT * FROM chapters";
        const params = [];
        if (query?.course_id) {
            sql += " WHERE course_id = ?";
            params.push(query.course_id);
        }
        if (query?.page && query?.limit) {
            const offset = (query.page - 1) * query.limit;
            sql += " ORDER BY ordering ASC LIMIT ? OFFSET ?";
            params.push(query.limit, offset);
        }
        else {
            sql += " ORDER BY ordering ASC";
        }
        const [rows] = await pool.query(sql, params);
        return rows;
    },
    async getById(id) {
        const [rows] = await pool.query("SELECT * FROM chapters WHERE id = ?", [id]);
        return rows[0] || null;
    },
    async getByCourse(course_id) {
        const [rows] = await pool.query("SELECT * FROM chapters WHERE course_id = ? ORDER BY ordering ASC", [course_id]);
        return rows;
    },
    async create(chapter) {
        const { course_id, title, ordering } = chapter;
        await pool.query("INSERT INTO chapters (course_id, title, ordering) VALUES (?, ?, ?)", [course_id, title, ordering]);
        // id sinh trong DB bằng UUID()
        return "OK";
    },
    async update(id, data) {
        const fields = Object.keys(data)
            .map((k) => `${k} = ?`)
            .join(", ");
        if (!fields)
            return;
        const values = Object.values(data);
        await pool.query(`UPDATE chapters SET ${fields} WHERE id = ?`, [...values, id]);
    },
    async delete(id) {
        await pool.query("DELETE FROM chapters WHERE id = ?", [id]);
    },
    async count(course_id) {
        let sql = "SELECT COUNT(*) as total FROM chapters";
        const params = [];
        if (course_id) {
            sql += " WHERE course_id = ?";
            params.push(course_id);
        }
        const [rows] = await pool.query(sql, params);
        return rows[0].total || 0;
    },
};
