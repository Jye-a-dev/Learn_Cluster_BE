import type { Course } from "../@types/course.js";
import { CourseModel } from "../models/course.model.js";

export const CourseService = {
	getAll: () => CourseModel.getAll(),
	getById: (id: number) => CourseModel.getById(id),
	create: (course: Partial<Course>) => CourseModel.create(course),
	update: (id: number, data: Partial<Course>) => CourseModel.update(id, data),
	delete: (id: number) => CourseModel.delete(id),
	count: () => CourseModel.count(),
	getAllFull: () => CourseModel.getAllFull?.(),
	getFullById: (id: number) => CourseModel.getFullById?.(id),
};
