import type { Permission } from "../@types/permission.js";
import { db as pool } from "../config/db.js";

export const PermissionModel = {
  async getAll(): Promise<Permission[]> {
    const [rows] = await pool.query("SELECT * FROM permissions");
    return rows as Permission[];
  },

  async getById(id: number): Promise<Permission | null> {
    const [rows] = await pool.query("SELECT * FROM permissions WHERE id = ?", [id]);
    return (rows as Permission[])[0] || null;
  },

  async create(permission: Partial<Permission>): Promise<number> {
    const { name, description } = permission;
    const [result] = await pool.query(
      "INSERT INTO permissions (name, description) VALUES (?, ?)",
      [name, description || null]
    );
    return (result as any).insertId;
  },

  async update(id: number, data: Partial<Permission>): Promise<void> {
    const fields = Object.keys(data)
      .map((k) => `${k} = ?`)
      .join(", ");
    const values = Object.values(data);
    await pool.query(`UPDATE permissions SET ${fields} WHERE id = ?`, [...values, id]);
  },

  async delete(id: number): Promise<void> {
    await pool.query("DELETE FROM permissions WHERE id = ?", [id]);
  },

  async count(): Promise<number> {
    const [rows] = await pool.query("SELECT COUNT(*) as total FROM permissions");
    return (rows as any)[0].total || 0;
  },
};
