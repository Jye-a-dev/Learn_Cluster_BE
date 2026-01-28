import type { Request, Response } from "express";
import { CourseInstructorService } from "../services/course_instructor.service.js";

export const CourseInstructorController = {
	// ===== GET ALL =====
	async getAll(req: Request, res: Response) {
		try {
			const instructors = await CourseInstructorService.getAll();
			res.json(instructors);
		} catch (error: any) {
			res
				.status(500)
				.json({ message: "Lỗi khi lấy danh sách course instructors", error: error.message });
		}
	},

	// ===== GET BY ID =====
	async getById(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;
			if (!id) return res.status(400).json({ message: "Yêu cầu ID" });

			const instructor = await CourseInstructorService.getById(id);
			if (!instructor)
				return res.status(404).json({ message: "Không thấy course instructor" });

			res.json(instructor);
		} catch (error: any) {
			res
				.status(500)
				.json({ message: "Lỗi khi lấy course instructor", error: error.message });
		}
	},

	// ===== GET BY COURSE =====
	async getByCourse(req: Request, res: Response) {
		try {
			const { course_id } = (req as any).validatedParams;
			if (!course_id)
				return res.status(400).json({ message: "Yêu cầu Course ID" });

			const instructors = await CourseInstructorService.getByCourse(course_id);
			res.json(instructors);
		} catch (error: any) {
			res
				.status(500)
				.json({ message: "Lỗi khi lấy instructors theo course", error: error.message });
		}
	},

	// ===== GET BY USER =====
	async getByUser(req: Request, res: Response) {
		try {
			const { user_id } = (req as any).validatedParams;
			if (!user_id)
				return res.status(400).json({ message: "Yêu cầu User ID" });

			const courses = await CourseInstructorService.getByUser(user_id);
			res.json(courses);
		} catch (error: any) {
			res
				.status(500)
				.json({ message: "Lỗi khi lấy course theo user", error: error.message });
		}
	},

	// ===== GET FULL BY COURSE =====
	async getFullByCourse(req: Request, res: Response) {
		try {
			const { course_id } = (req as any).validatedParams;
			if (!course_id)
				return res.status(400).json({ message: "Yêu cầu Course ID" });

			const instructors =
				await CourseInstructorService.getFullByCourse(course_id);
			res.json(instructors);
		} catch (error: any) {
			res.status(500).json({
				message: "Lỗi khi lấy danh sách instructors đầy đủ",
				error: error.message,
			});
		}
	},

	// ===== CREATE =====
	async create(req: Request, res: Response) {
		try {
			await CourseInstructorService.create(req.body);
			res.status(201).json({ message: "Course instructor created" });
		} catch (error: any) {
			res
				.status(500)
				.json({ message: "Lỗi khi tạo course instructor", error: error.message });
		}
	},

	// ===== UPDATE ROLE =====
	async updateRole(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;
			if (!id) return res.status(400).json({ message: "Yêu cầu ID" });

			const { role_in_course } = req.body;
			await CourseInstructorService.updateRole(id, role_in_course);

			res.json({ message: "Course instructor updated" });
		} catch (error: any) {
			res
				.status(500)
				.json({ message: "Lỗi khi cập nhật role instructor", error: error.message });
		}
	},

	// ===== DELETE =====
	async delete(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;
			if (!id) return res.status(400).json({ message: "Yêu cầu ID" });

			await CourseInstructorService.delete(id);
			res.json({ message: "Course instructor deleted" });
		} catch (error: any) {
			res
				.status(500)
				.json({ message: "Lỗi khi xóa course instructor", error: error.message });
		}
	},

	// ===== DELETE BY COURSE =====
	async deleteByCourse(req: Request, res: Response) {
		try {
			const { course_id } = (req as any).validatedParams;
			if (!course_id)
				return res.status(400).json({ message: "Yêu cầu Course ID" });

			await CourseInstructorService.deleteByCourse(course_id);
			res.json({ message: "Deleted all instructors of course" });
		} catch (error: any) {
			res.status(500).json({
				message: "Lỗi khi xóa instructors theo course",
				error: error.message,
			});
		}
	},
};
