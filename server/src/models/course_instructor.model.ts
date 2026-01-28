import { db as pool } from "../config/db.js";
import type { CourseInstructor } from "../@types/course_instructor.js";

export const CourseInstructorModel = {
	// ===== GET ALL =====
	async getAll(): Promise<CourseInstructor[]> {
		const [rows] = await pool.query("SELECT * FROM course_instructors");
		return rows as CourseInstructor[];
	},

	// ===== GET BY ID =====
	async getById(id: string): Promise<CourseInstructor | null> {
		const [rows] = await pool.query("SELECT * FROM course_instructors WHERE id = ?", [id]);
		return (rows as CourseInstructor[])[0] || null;
	},

	// ===== GET BY COURSE =====
	async getByCourse(course_id: string): Promise<CourseInstructor[]> {
		const [rows] = await pool.query("SELECT * FROM course_instructors WHERE course_id = ?", [course_id]);
		return rows as CourseInstructor[];
	},

	// ===== GET BY USER =====
	async getByUser(user_id: string): Promise<CourseInstructor[]> {
		const [rows] = await pool.query("SELECT * FROM course_instructors WHERE user_id = ?", [user_id]);
		return rows as CourseInstructor[];
	},

	// ===== CREATE =====
	async create(data: CourseInstructor): Promise<void> {
		const { id, course_id, user_id, role_in_course } = data;

		await pool.query(
			`
			INSERT INTO course_instructors (id, course_id, user_id, role_in_course)
			VALUES (?, ?, ?, ?)
			`,
			[id, course_id, user_id, role_in_course],
		);
	},

	// ===== UPDATE ROLE =====
	async updateRole(id: string, role_in_course: CourseInstructor["role_in_course"]): Promise<void> {
		await pool.query(
			`
			UPDATE course_instructors
			SET role_in_course = ?
			WHERE id = ?
			`,
			[role_in_course, id],
		);
	},

	// ===== DELETE BY ID =====
	async delete(id: string): Promise<void> {
		await pool.query("DELETE FROM course_instructors WHERE id = ?", [id]);
	},

	// ===== DELETE ALL BY COURSE =====
	async deleteByCourse(course_id: string): Promise<void> {
		await pool.query("DELETE FROM course_instructors WHERE course_id = ?", [course_id]);
	},

	// ===== COUNT BY COURSE =====
	async countByCourse(course_id: string): Promise<number> {
		const [rows] = await pool.query("SELECT COUNT(*) AS total FROM course_instructors WHERE course_id = ?", [course_id]);
		return (rows as any)[0].total || 0;
	},

	// ===== FULL INFO (JOIN USERS) =====
	async getFullByCourse(course_id: string): Promise<any[]> {
		const [rows] = await pool.query(
			`
			SELECT 
				ci.*,
				u.username,
				u.email
			FROM course_instructors ci
			JOIN users u ON ci.user_id = u.id
			WHERE ci.course_id = ?
			`,
			[course_id],
		);
		return rows as any[];
	},
};
