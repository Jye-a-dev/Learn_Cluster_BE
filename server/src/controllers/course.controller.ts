import type { Request, Response } from "express";
import { CourseService } from "../services/course.service.js";

export const CourseController = {
	async getAll(req: Request, res: Response) {
		try {
			const query = (req as any).validatedQuery;
			const courses = await CourseService.getFiltered(query);
			res.json(courses);
		} catch (error: any) {
			res.status(500).json({ message: "Lỗi khi lấy danh sách courses", error: error.message });
		}
	},

	async getAllFull(req: Request, res: Response) {
		try {
			const courses = await CourseService.getAllFull?.();
			res.json(courses);
		} catch (error: any) {
			res.status(500).json({ message: "Lỗi khi lấy danh sách courses đầy đủ", error: error.message });
		}
	},

	async getById(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;
			if (!id) return res.status(400).json({ message: "Yêu cầu Course ID" });

			const course = await CourseService.getById(Number(id));
			if (!course) return res.status(404).json({ message: "Không thấy course" });

			res.json(course);
		} catch (error: any) {
			res.status(500).json({ message: "Lỗi khi lấy course", error: error.message });
		}
	},

	async getFullById(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;
			if (!id) return res.status(400).json({ message: "Yêu cầu Course ID" });

			const course = await CourseService.getFullById?.(Number(id));
			if (!course) return res.status(404).json({ message: "Không thấy course" });

			res.json(course);
		} catch (error: any) {
			res.status(500).json({ message: "Lỗi khi lấy course đầy đủ", error: error.message });
		}
	},

	async getByTeacher(req: Request, res: Response) {
		try {
			const { teacherId } = (req as any).validatedParams;
			const courses = await CourseService.getByTeacher(teacherId);
			res.json(courses);
		} catch (error: any) {
			res.status(500).json({ message: "Lỗi khi lấy courses của giáo viên", error: error.message });
		}
	},

	async count(req: Request, res: Response) {
		try {
			const query = (req as any).validatedQuery;
			const total = await CourseService.count(query?.status, query?.teacher_id, query?.search);
			res.json({ total });
		} catch (error: any) {
			res.status(500).json({ message: "Lỗi khi đếm courses", error: error.message });
		}
	},

	async create(req: Request, res: Response) {
		try {
			const id = await CourseService.create(req.body);
			res.status(201).json({ id });
		} catch (error: any) {
			res.status(500).json({ message: "Lỗi khi tạo course", error: error.message });
		}
	},

	async update(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;
			if (!id) return res.status(400).json({ message: "Yêu cầu Course ID" });

			await CourseService.update(Number(id), req.body);
			res.json({ message: "Course updated" });
		} catch (error: any) {
			res.status(500).json({ message: "Lỗi khi cập nhật course", error: error.message });
		}
	},

	async delete(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;
			if (!id) return res.status(400).json({ message: "Yêu cầu Course ID" });

			await CourseService.delete(Number(id));
			res.json({ message: "Course deleted" });
		} catch (error: any) {
			res.status(500).json({ message: "Lỗi khi xóa course", error: error.message });
		}
	},
};
