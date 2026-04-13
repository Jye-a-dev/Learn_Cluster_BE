import { db as pool } from "../../config/db.js";
export const RolePermissionModel = {
    /* ---------- GET ---------- */
    async getAll() {
        const [rows] = await pool.query("SELECT * FROM role_permissions");
        return rows;
    },
    async getById(id) {
        const [rows] = await pool.query("SELECT * FROM role_permissions WHERE id = ?", [id]);
        return rows[0] || null;
    },
    async getByRoleId(role_id) {
        const [rows] = await pool.query("SELECT * FROM role_permissions WHERE role_id = ?", [role_id]);
        return rows;
    },
    async getByPermissionId(permission_id) {
        const [rows] = await pool.query("SELECT * FROM role_permissions WHERE permission_id = ?", [permission_id]);
        return rows;
    },
    /* ---------- CREATE ---------- */
    async add(role_id, permission_id) {
        await pool.query(`INSERT INTO role_permissions (role_id, permission_id)
       VALUES (?, ?)`, [role_id, permission_id]);
    },
    /* ---------- DELETE ---------- */
    async removeById(id) {
        await pool.query("DELETE FROM role_permissions WHERE id = ?", [id]);
    },
    async remove(role_id, permission_id) {
        await pool.query(`DELETE FROM role_permissions
       WHERE role_id = ? AND permission_id = ?`, [role_id, permission_id]);
    },
    async removeByRole(role_id) {
        await pool.query("DELETE FROM role_permissions WHERE role_id = ?", [role_id]);
    },
    async removeByPermission(permission_id) {
        await pool.query("DELETE FROM role_permissions WHERE permission_id = ?", [permission_id]);
    },
    /* ---------- COUNT ---------- */
    async countByRole(role_id) {
        const [rows] = await pool.query("SELECT COUNT(*) AS total FROM role_permissions WHERE role_id = ?", [role_id]);
        return Number(rows[0]?.total ?? 0);
    },
    async countByPermission(permission_id) {
        const [rows] = await pool.query("SELECT COUNT(*) AS total FROM role_permissions WHERE permission_id = ?", [permission_id]);
        return Number(rows[0]?.total ?? 0);
    },
    async updateById(id, data) {
        const fields = Object.keys(data)
            .map((k) => `${k} = ?`)
            .join(", ");
        if (!fields)
            return;
        const values = Object.values(data);
        await pool.query(`UPDATE role_permissions SET ${fields} WHERE id = ?`, [...values, id]);
    },
};
