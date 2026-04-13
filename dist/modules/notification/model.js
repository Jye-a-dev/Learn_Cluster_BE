import { db as pool } from "../../config/db.js";
export const NotificationModel = {
    async getByUser(user_id, query) {
        const { page = 1, limit = 20, type, is_read } = query || {};
        const offset = (page - 1) * limit;
        let sql = `SELECT * FROM notifications WHERE user_id = ?`;
        const params = [user_id];
        if (type) {
            sql += " AND type = ?";
            params.push(type);
        }
        if (typeof is_read === "boolean") {
            sql += " AND is_read = ?";
            params.push(is_read);
        }
        sql += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`;
        params.push(limit, offset);
        const [rows] = await pool.query(sql, params);
        return rows;
    },
    async getAll() {
        const [rows] = await pool.query("SELECT * FROM notifications ORDER BY created_at DESC");
        return rows;
    },
    async getById(id) {
        const [rows] = await pool.query("SELECT * FROM notifications WHERE id = ?", [id]);
        return rows[0] ?? null;
    },
    async create(data) {
        const { sender_id, user_id, type, reference_id, reference_type, content, } = data;
        const id = crypto.randomUUID();
        await pool.query(`INSERT INTO notifications
       (id, sender_id, user_id, type, reference_id, reference_type, content)
       VALUES (?, ?, ?, ?, ?, ?, ?)`, [
            id,
            sender_id ?? null, // NULL = system
            user_id,
            type ?? null,
            reference_id ?? null,
            reference_type ?? null,
            content ?? null,
        ]);
        return id;
    },
    async markAsRead(id) {
        await pool.query("UPDATE notifications SET is_read = TRUE WHERE id = ?", [id]);
    },
    async delete(id) {
        await pool.query("DELETE FROM notifications WHERE id = ?", [id]);
    },
    async countUnread(user_id) {
        const [rows] = await pool.query(`SELECT COUNT(*) AS total
       FROM notifications
       WHERE user_id = ? AND is_read = FALSE`, [user_id]);
        return rows[0]?.total ?? 0;
    },
    async markAllAsRead(user_id) {
        await pool.query("UPDATE notifications SET is_read = TRUE WHERE user_id = ?", [user_id]);
    },
    async getUnreadByUser(user_id) {
        const [rows] = await pool.query(`SELECT * FROM notifications
       WHERE user_id = ? AND is_read = FALSE
       ORDER BY created_at DESC`, [user_id]);
        return rows;
    },
    async bulkMarkAsRead(ids) {
        if (!ids.length)
            return;
        await pool.query(`UPDATE notifications
       SET is_read = TRUE
       WHERE id IN (?)`, [ids]);
    },
    async deleteAllByUser(user_id) {
        await pool.query("DELETE FROM notifications WHERE user_id = ?", [user_id]);
    },
};
