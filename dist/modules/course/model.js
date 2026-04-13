import { db as pool } from "../../config/db.js";
export const CourseModel = {
    async getAll() {
        const [rows] = await pool.query("SELECT * FROM courses");
        return rows;
    },
    async getById(id) {
        const [rows] = await pool.query("SELECT * FROM courses WHERE id = ?", [id]);
        return rows[0] || null;
    },
    async create(course) {
        const { title, description, objective, duration_hours, status } = course;
        await pool.query(`INSERT INTO courses (title, description, objective, duration_hours, status)
			 VALUES (?, ?, ?, ?, ?)`, [
            title,
            description ?? null,
            objective ?? null,
            duration_hours ?? null,
            status ?? "draft",
        ]);
        // lấy UUID vừa tạo
        const [rows] = await pool.query(`SELECT id FROM courses WHERE title = ? ORDER BY created_at DESC LIMIT 1`, [title]);
        return rows[0].id;
    },
    async update(id, data) {
        const fields = Object.keys(data).map((k) => `${k} = ?`).join(", ");
        const values = Object.values(data);
        await pool.query(`UPDATE courses SET ${fields} WHERE id = ?`, [...values, id]);
    },
    async delete(id) {
        await pool.query("DELETE FROM courses WHERE id = ?", [id]);
    },
    async countFiltered(status, search) {
        let sql = "SELECT COUNT(*) as total FROM courses WHERE 1=1";
        const params = [];
        if (status) {
            sql += " AND status = ?";
            params.push(status);
        }
        if (search) {
            sql += " AND (title LIKE ? OR description LIKE ?)";
            params.push(`%${search}%`, `%${search}%`);
        }
        const [rows] = await pool.query(sql, params);
        return rows[0].total || 0;
    },
    async getFiltered(options) {
        let sql = "SELECT * FROM courses WHERE 1=1";
        const params = [];
        if (options.status) {
            sql += " AND status = ?";
            params.push(options.status);
        }
        if (options.search) {
            sql += " AND (title LIKE ? OR description LIKE ?)";
            params.push(`%${options.search}%`, `%${options.search}%`);
        }
        sql += " ORDER BY created_at DESC";
        if (options.page && options.limit) {
            sql += " LIMIT ? OFFSET ?";
            params.push(options.limit, (options.page - 1) * options.limit);
        }
        const [rows] = await pool.query(sql, params);
        return rows;
    },
};
