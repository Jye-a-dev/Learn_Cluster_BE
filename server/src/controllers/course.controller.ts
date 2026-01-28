import type { Request, Response } from "express";
import { CourseService } from "../services/course.service.js";

export const CourseController = {
	// ===== GET ALL (FILTERED) =====
	async getAll(req: Request, res: Response) {
		try {
			const query = (req as any).validatedQuery;
			const courses = await CourseService.getFiltered(query);
			res.json(courses);
		} catch (error: any) {
			res
				.status(500)
				.json({ message: "Lỗi khi lấy danh sách courses", error: error.message });
		}
	},


	// ===== GET BY ID (UUID) =====
	async getById(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;
			if (!id)
				return res.status(400).json({ message: "Yêu cầu Course ID" });

			const course = await CourseService.getById(id);
			if (!course)
				return res.status(404).json({ message: "Không thấy course" });

			res.json(course);
		} catch (error: any) {
			res
				.status(500)
				.json({ message: "Lỗi khi lấy course", error: error.message });
		}
	},

	// ===== COUNT =====
	async count(req: Request, res: Response) {
		try {
			const query = (req as any).validatedQuery;
			const total = await CourseService.count(
				query?.status,
				query?.search
			);
			res.json({ total });
		} catch (error: any) {
			res
				.status(500)
				.json({ message: "Lỗi khi đếm courses", error: error.message });
		}
	},

	// ===== CREATE =====
	async create(req: Request, res: Response) {
		try {
			const id = await CourseService.create(req.body);
			res.status(201).json({ id });
		} catch (error: any) {
			res
				.status(500)
				.json({ message: "Lỗi khi tạo course", error: error.message });
		}
	},

	// ===== UPDATE =====
	async update(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;
			if (!id)
				return res.status(400).json({ message: "Yêu cầu Course ID" });

			await CourseService.update(id, req.body);
			res.json({ message: "Course updated" });
		} catch (error: any) {
			res.status(500).json({
				message: "Lỗi khi cập nhật course",
				error: error.message,
			});
		}
	},

	// ===== DELETE =====
	async delete(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;
			if (!id)
				return res.status(400).json({ message: "Yêu cầu Course ID" });

			await CourseService.delete(id);
			res.json({ message: "Course deleted" });
		} catch (error: any) {
			res
				.status(500)
				.json({ message: "Lỗi khi xóa course", error: error.message });
		}
	},
};
