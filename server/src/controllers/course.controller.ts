// src/controllers/course.controller.ts
import type { Request, Response } from "express";
import { CourseService } from "../services/course.service.js";

export const CourseController = {
	async getAll(req: Request, res: Response) {
		try {
			const courses = await CourseService.getAll();
			res.json(courses);
		} catch (error: any) {
			res.status(500).json({ message: "Lỗi khi lấy danh sách courses", error: error.message });
		}
	},

	async getAllFull(req: Request, res: Response) {
		try {
			const courses = await CourseService.getAllFull?.(); // nếu có join bảng khác
			res.json(courses);
		} catch (error: any) {
			res.status(500).json({ message: "Lỗi khi lấy danh sách courses đầy đủ", error: error.message });
		}
	},

	async getById(req: Request, res: Response) {
		try {
			const id = Number(req.params.id);
			if (!id) return res.status(400).json({ message: "Yêu cầu Course ID" });

			const course = await CourseService.getById(id);
			if (!course) return res.status(404).json({ message: "Không thấy course" });

			res.json(course);
		} catch (error: any) {
			res.status(500).json({ message: "Lỗi khi lấy course", error: error.message });
		}
	},

	async getFullById(req: Request, res: Response) {
		try {
			const id = Number(req.params.id);
			if (!id) return res.status(400).json({ message: "Yêu cầu Course ID" });

			const course = await CourseService.getFullById?.(id); // nếu có join bảng khác
			if (!course) return res.status(404).json({ message: "Không thấy course" });

			res.json(course);
		} catch (error: any) {
			res.status(500).json({ message: "Lỗi khi lấy course đầy đủ", error: error.message });
		}
	},

	async count(req: Request, res: Response) {
		try {
			const total = await CourseService.count();
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
			const id = Number(req.params.id);
			if (!id) return res.status(400).json({ message: "Yêu cầu Course ID" });

			await CourseService.update(id, req.body);
			res.json({ message: "Course updated" });
		} catch (error: any) {
			res.status(500).json({ message: "Lỗi khi cập nhật course", error: error.message });
		}
	},

	async delete(req: Request, res: Response) {
		try {
			const id = Number(req.params.id);
			if (!id) return res.status(400).json({ message: "Yêu cầu Course ID" });

			await CourseService.delete(id);
			res.json({ message: "Course deleted" });
		} catch (error: any) {
			res.status(500).json({ message: "Lỗi khi xóa course", error: error.message });
		}
	},
};
