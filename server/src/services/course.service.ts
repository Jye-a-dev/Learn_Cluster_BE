import type { Course } from "../@types/course.js";
import { CourseModel } from "../models/course.model.js";

export const CourseService = {
	getAll: (query?: any) => (query ? CourseModel.getFiltered(query) : CourseModel.getAll()),
	count: (status?: string, teacher_id?: string, search?: string) => CourseModel.countFiltered(status, teacher_id, search),

	getById: (id: number) => CourseModel.getById(id),

	getByTeacher: (teacher_id: string) => CourseModel.getByTeacher(teacher_id),

	create: (course: Partial<Course>) => CourseModel.create(course),

	update: (id: number, data: Partial<Course>) => CourseModel.update(id, data),

	delete: (id: number) => CourseModel.delete(id),

	getAllFull: () => CourseModel.getAllFull?.(),

	getFullById: (id: number) => CourseModel.getFullById?.(id),

	getFiltered: (query?: { status?: string; teacher_id?: string; search?: string; page?: number; limit?: number }) =>
		query ? CourseModel.getFiltered(query) : CourseModel.getAll(),
};
