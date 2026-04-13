import { db as pool } from "../../config/db.js";
export const CourseInstructorModel = {
    // ===== GET ALL =====
    async getAll() {
        const [rows] = await pool.query("SELECT * FROM course_instructors");
        return rows;
    },
    // ===== GET BY ID =====
    async getById(id) {
        const [rows] = await pool.query("SELECT * FROM course_instructors WHERE id = ?", [id]);
        return rows[0] || null;
    },
    // ===== GET BY COURSE =====
    async getByCourse(course_id) {
        const [rows] = await pool.query("SELECT * FROM course_instructors WHERE course_id = ?", [course_id]);
        return rows;
    },
    // ===== GET BY USER =====
    async getByUser(user_id) {
        const [rows] = await pool.query("SELECT * FROM course_instructors WHERE user_id = ?", [user_id]);
        return rows;
    },
    // ===== CREATE =====
    async create(data) {
        const { course_id, user_id, role_in_course } = data;
        // ❗ KHÔNG insert id → DB tự sinh UUID()
        await pool.query(`
			INSERT INTO course_instructors (course_id, user_id, role_in_course)
			VALUES (?, ?, ?)
			`, [course_id, user_id, role_in_course]);
    },
    // ===== UPDATE ROLE =====
    async updateRole(id, role_in_course) {
        await pool.query(`
			UPDATE course_instructors
			SET role_in_course = ?
			WHERE id = ?
			`, [role_in_course, id]);
    },
    // ===== DELETE BY ID =====
    async delete(id) {
        await pool.query("DELETE FROM course_instructors WHERE id = ?", [id]);
    },
    // ===== DELETE ALL BY COURSE =====
    async deleteByCourse(course_id) {
        await pool.query("DELETE FROM course_instructors WHERE course_id = ?", [course_id]);
    },
    // ===== COUNT BY COURSE =====
    async countByCourse(course_id) {
        const [rows] = await pool.query("SELECT COUNT(*) AS total FROM course_instructors WHERE course_id = ?", [course_id]);
        return rows[0].total || 0;
    },
    // ===== FULL INFO (JOIN USERS) =====
    async getFullByCourse(course_id) {
        const [rows] = await pool.query(`
			SELECT 
				ci.*,
				u.username,
				u.email
			FROM course_instructors ci
			JOIN users u ON ci.user_id = u.id
			WHERE ci.course_id = ?
			`, [course_id]);
        return rows;
    },
};
