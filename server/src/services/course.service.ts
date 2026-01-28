import type { Course } from "../@types/course.js";
import { CourseModel } from "../models/course.model.js";

export const CourseService = {
	getAll: (query?: any) => (query ? CourseModel.getFiltered(query) : CourseModel.getAll()),

	count: (status?: string, search?: string) => CourseModel.countFiltered(status, search),

	getById: (id: string) => CourseModel.getById(id),

	create: (course: Partial<Course>) => CourseModel.create(course),

	update: (id: string, data: Partial<Course>) => CourseModel.update(id, data),

	delete: (id: string) => CourseModel.delete(id),

	getFiltered: (query?: any) => (query ? CourseModel.getFiltered(query) : CourseModel.getAll()),
};
