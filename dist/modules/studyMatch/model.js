import { db as pool } from "../../config/db.js";
export const StudyMatchModel = {
    async getAll(query) {
        let sql = "SELECT * FROM study_matches WHERE 1=1";
        const values = [];
        if (query?.user_id) {
            sql += " AND (user1_id = ? OR user2_id = ?)";
            values.push(query.user_id, query.user_id);
        }
        sql += " ORDER BY matched_at DESC";
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
        const [rows] = await pool.query("SELECT * FROM study_matches WHERE id = ?", [id]);
        return rows[0] || null;
    },
    async getByUsers(user1_id, user2_id) {
        const [rows] = await pool.query(`SELECT * FROM study_matches 
			 WHERE (user1_id = ? AND user2_id = ?)
			    OR (user1_id = ? AND user2_id = ?)`, [user1_id, user2_id, user2_id, user1_id]);
        return rows[0] || null;
    },
    async create(data) {
        const { user1_id, user2_id } = data;
        const [result] = await pool.query(`INSERT INTO study_matches (user1_id, user2_id)
			 VALUES (?, ?)`, [user1_id, user2_id]);
        return result.insertId;
    },
    async delete(id) {
        await pool.query("DELETE FROM study_matches WHERE id = ?", [id]);
    },
    async deleteByUsers(user1_id, user2_id) {
        await pool.query(`DELETE FROM study_matches
			 WHERE (user1_id = ? AND user2_id = ?)
			    OR (user1_id = ? AND user2_id = ?)`, [user1_id, user2_id, user2_id, user1_id]);
    },
    async count() {
        const [rows] = await pool.query("SELECT COUNT(*) as total FROM study_matches");
        return rows[0].total || 0;
    },
};
