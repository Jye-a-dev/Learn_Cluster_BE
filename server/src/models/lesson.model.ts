import type { Lesson } from "../@types/lesson.js";
import { db as pool } from "../config/db.js";

export const LessonModel = {
  async getAll(): Promise<Lesson[]> {
    const [rows] = await pool.query("SELECT * FROM lessons");
    return rows as Lesson[];
  },

  async getById(id: number): Promise<Lesson | null> {
    const [rows] = await pool.query("SELECT * FROM lessons WHERE id = ?", [id]);
    return (rows as Lesson[])[0] || null;
  },

  async create(lesson: Partial<Lesson>): Promise<number> {
    const { chapter_id, title, content_type, content_url, ordering } = lesson;
    const [result] = await pool.query(
      "INSERT INTO lessons (chapter_id, title, content_type, content_url, ordering) VALUES (?, ?, ?, ?, ?)",
      [chapter_id, title, content_type, content_url || null, ordering]
    );
    return (result as any).insertId;
  },

  async update(id: number, data: Partial<Lesson>): Promise<void> {
    const fields = Object.keys(data)
      .map((k) => `${k} = ?`)
      .join(", ");
    const values = Object.values(data);
    await pool.query(`UPDATE lessons SET ${fields} WHERE id = ?`, [...values, id]);
  },

  async delete(id: number): Promise<void> {
    await pool.query("DELETE FROM lessons WHERE id = ?", [id]);
  },

  async count(): Promise<number> {
    const [rows] = await pool.query("SELECT COUNT(*) as total FROM lessons");
    return (rows as any)[0].total || 0;
  },
};
