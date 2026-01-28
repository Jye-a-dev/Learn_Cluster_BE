import type { CourseInstructor } from "../@types/course_instructor.js";
import { CourseInstructorModel } from "../models/course_instructor.model.js";

export const CourseInstructorService = {
	// ===== GET ALL =====
	getAll: () => CourseInstructorModel.getAll(),

	// ===== GET BY ID =====
	getById: (id: string) => CourseInstructorModel.getById(id),

	// ===== GET BY COURSE =====
	getByCourse: (course_id: string) => CourseInstructorModel.getByCourse(course_id),

	// ===== GET BY USER =====
	getByUser: (user_id: string) => CourseInstructorModel.getByUser(user_id),

	// ===== CREATE =====
	create: (data: CourseInstructor) => CourseInstructorModel.create(data),

	// ===== UPDATE ROLE =====
	updateRole: (id: string, role_in_course: CourseInstructor["role_in_course"]) => CourseInstructorModel.updateRole(id, role_in_course),

	// ===== DELETE =====
	delete: (id: string) => CourseInstructorModel.delete(id),

	// ===== DELETE ALL BY COURSE =====
	deleteByCourse: (course_id: string) => CourseInstructorModel.deleteByCourse(course_id),

	// ===== COUNT BY COURSE =====
	countByCourse: (course_id: string) => CourseInstructorModel.countByCourse(course_id),

	// ===== FULL INFO =====
	getFullByCourse: (course_id: string) => CourseInstructorModel.getFullByCourse(course_id),
};
