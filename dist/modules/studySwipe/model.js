import { db as pool } from "../../config/db.js";
export const StudySwipeModel = {
    async getAll(query) {
        let sql = "SELECT * FROM study_swipes WHERE 1=1";
        const values = [];
        if (query?.swiper_id) {
            sql += " AND swiper_id = ?";
            values.push(query.swiper_id);
        }
        if (query?.target_id) {
            sql += " AND target_id = ?";
            values.push(query.target_id);
        }
        if (query?.status) {
            sql += " AND status = ?";
            values.push(query.status);
        }
        sql += " ORDER BY created_at DESC";
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
        const [rows] = await pool.query("SELECT * FROM study_swipes WHERE id = ?", [id]);
        return rows[0] || null;
    },
    async getByUsers(swiper_id, target_id) {
        const [rows] = await pool.query(`SELECT * FROM study_swipes 
			 WHERE swiper_id = ? AND target_id = ?`, [swiper_id, target_id]);
        return rows[0] || null;
    },
    async create(data) {
        const { swiper_id, target_id, status } = data;
        const [result] = await pool.query(`INSERT INTO study_swipes (swiper_id, target_id, status)
			 VALUES (?, ?, ?)`, [swiper_id, target_id, status || "pending"]);
        return result.insertId;
    },
    async update(id, data) {
        const fields = Object.keys(data)
            .map((k) => `${k} = ?`)
            .join(", ");
        const values = Object.values(data);
        await pool.query(`UPDATE study_swipes SET ${fields} WHERE id = ?`, [...values, id]);
    },
    async delete(id) {
        await pool.query("DELETE FROM study_swipes WHERE id = ?", [id]);
    },
    async deleteByUsers(swiper_id, target_id) {
        await pool.query(`DELETE FROM study_swipes 
			 WHERE swiper_id = ? AND target_id = ?`, [swiper_id, target_id]);
    },
    async count() {
        const [rows] = await pool.query("SELECT COUNT(*) as total FROM study_swipes");
        return rows[0].total || 0;
    },
};
