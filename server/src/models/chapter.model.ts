import type { Chapter } from "../@types/chapter.js";
import { db as pool } from "../config/db.js";

export const ChapterModel = {
  async getAll(query?: {
    course_id?: string;
    page?: number;
    limit?: number;
  }): Promise<Chapter[]> {
    let sql = "SELECT * FROM chapters";
    const params: any[] = [];

    if (query?.course_id) {
      sql += " WHERE course_id = ?";
      params.push(query.course_id);
    }

    if (query?.page && query?.limit) {
      const offset = (query.page - 1) * query.limit;
      sql += " ORDER BY ordering ASC LIMIT ? OFFSET ?";
      params.push(query.limit, offset);
    } else {
      sql += " ORDER BY ordering ASC";
    }

    const [rows] = await pool.query(sql, params);
    return rows as Chapter[];
  },

  async getById(id: string): Promise<Chapter | null> {
    const [rows] = await pool.query(
      "SELECT * FROM chapters WHERE id = ?",
      [id]
    );
    return (rows as Chapter[])[0] || null;
  },

  async getByCourse(course_id: string): Promise<Chapter[]> {
    const [rows] = await pool.query(
      "SELECT * FROM chapters WHERE course_id = ? ORDER BY ordering ASC",
      [course_id]
    );
    return rows as Chapter[];
  },

  async create(chapter: Partial<Chapter>): Promise<string> {
    const { course_id, title, ordering } = chapter;

    await pool.query(
      "INSERT INTO chapters (course_id, title, ordering) VALUES (?, ?, ?)",
      [course_id, title, ordering]
    );

    // id sinh trong DB bằng UUID()
    return "OK";
  },

  async update(id: string, data: Partial<Chapter>): Promise<void> {
    const fields = Object.keys(data)
      .map((k) => `${k} = ?`)
      .join(", ");

    if (!fields) return;

    const values = Object.values(data);

    await pool.query(
      `UPDATE chapters SET ${fields} WHERE id = ?`,
      [...values, id]
    );
  },

  async delete(id: string): Promise<void> {
    await pool.query("DELETE FROM chapters WHERE id = ?", [id]);
  },

  async count(course_id?: string): Promise<number> {
    let sql = "SELECT COUNT(*) as total FROM chapters";
    const params: any[] = [];

    if (course_id) {
      sql += " WHERE course_id = ?";
      params.push(course_id);
    }

    const [rows] = await pool.query(sql, params);
    return (rows as any)[0].total || 0;
  },
};
