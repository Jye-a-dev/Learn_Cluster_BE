import type { Chapter } from "../@types/chapter.js";
import { db as pool } from "../config/db.js";

export const ChapterModel = {
  async getAll(): Promise<Chapter[]> {
    const [rows] = await pool.query("SELECT * FROM chapters");
    return rows as Chapter[];
  },

  async getById(id: number): Promise<Chapter | null> {
    const [rows] = await pool.query("SELECT * FROM chapters WHERE id = ?", [id]);
    return (rows as Chapter[])[0] || null;
  },

  async create(chapter: Partial<Chapter>): Promise<number> {
    const { course_id, title, ordering } = chapter;
    const [result] = await pool.query(
      "INSERT INTO chapters (course_id, title, ordering) VALUES (?, ?, ?)",
      [course_id, title, ordering]
    );
    return (result as any).insertId;
  },

  async update(id: number, data: Partial<Chapter>): Promise<void> {
    const fields = Object.keys(data)
      .map((k) => `${k} = ?`)
      .join(", ");
    const values = Object.values(data);
    await pool.query(`UPDATE chapters SET ${fields} WHERE id = ?`, [...values, id]);
  },

  async delete(id: number): Promise<void> {
    await pool.query("DELETE FROM chapters WHERE id = ?", [id]);
  },

  async count(): Promise<number> {
    const [rows] = await pool.query("SELECT COUNT(*) as total FROM chapters");
    return (rows as any)[0].total || 0;
  },
};
