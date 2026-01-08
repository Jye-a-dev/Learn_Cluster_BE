import type { Grade } from "../@types/grade.js";
import { db as pool } from "../config/db.js";

export const GradeModel = {
  async getAll(): Promise<Grade[]> {
    const [rows] = await pool.query("SELECT * FROM grades");
    return rows as Grade[];
  },

  async getById(id: number): Promise<Grade | null> {
    const [rows] = await pool.query("SELECT * FROM grades WHERE id = ?", [id]);
    return (rows as Grade[])[0] || null;
  },

  async create(data: Partial<Grade>): Promise<number> {
    const { submission_id, grader_id, score, feedback } = data;
    const [result] = await pool.query(
      "INSERT INTO grades (submission_id, grader_id, score, feedback) VALUES (?, ?, ?, ?)",
      [submission_id, grader_id || null, score || null, feedback || null]
    );
    return (result as any).insertId;
  },

  async update(id: number, data: Partial<Grade>): Promise<void> {
    const fields = Object.keys(data).map(k => `${k} = ?`).join(", ");
    const values = Object.values(data);
    await pool.query(`UPDATE grades SET ${fields} WHERE id = ?`, [...values, id]);
  },

  async delete(id: number): Promise<void> {
    await pool.query("DELETE FROM grades WHERE id = ?", [id]);
  },

  async count(): Promise<number> {
    const [rows] = await pool.query("SELECT COUNT(*) as total FROM grades");
    return (rows as any)[0].total || 0;
  },

  // ===== EXTRA METHODS =====

  async getBySubmission(submission_id: number): Promise<Grade[]> {
    const [rows] = await pool.query("SELECT * FROM grades WHERE submission_id = ?", [submission_id]);
    return rows as Grade[];
  },

  async getByGrader(grader_id: string): Promise<Grade[]> {
    const [rows] = await pool.query("SELECT * FROM grades WHERE grader_id = ?", [grader_id]);
    return rows as Grade[];
  },

  async updateFeedback(id: number, feedback: string | null): Promise<void> {
    await pool.query("UPDATE grades SET feedback = ? WHERE id = ?", [feedback, id]);
  },

  async getTop(n: number): Promise<Grade[]> {
    const [rows] = await pool.query(
      "SELECT * FROM grades ORDER BY score DESC LIMIT ?",
      [n]
    );
    return rows as Grade[];
  }
};
