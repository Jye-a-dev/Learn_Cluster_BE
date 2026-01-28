import type { Request, Response } from "express";
import { StudyDateLessonService } from "../services/study_date_lesson.service.js";

export const StudyDateLessonController = {
	async getAll(req: Request, res: Response) {
		try {
			const query = (req as any).validatedQuery;
			const data = await StudyDateLessonService.getAll(query);
			res.json(data);
		} catch (error: any) {
			res.status(500).json({
				message: "Lỗi khi lấy study_date_lessons",
				error: error.message,
			});
		}
	},

	async getById(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;
			const data = await StudyDateLessonService.getById(id);
			if (!data)
				return res.status(404).json({ message: "Không tìm thấy dữ liệu" });

			res.json(data);
		} catch (error: any) {
			res.status(500).json({
				message: "Lỗi khi lấy dữ liệu",
				error: error.message,
			});
		}
	},

	async count(req: Request, res: Response) {
		try {
			const query = (req as any).validatedQuery;
			const total = await StudyDateLessonService.count(
				query?.study_date_id,
				query?.lesson_id
			);
			res.json({ total });
		} catch (error: any) {
			res.status(500).json({
				message: "Lỗi khi đếm dữ liệu",
				error: error.message,
			});
		}
	},

	async create(req: Request, res: Response) {
		try {
			const id = await StudyDateLessonService.create(req.body);
			res.status(201).json({ id });
		} catch (error: any) {
			res.status(500).json({
				message: "Lỗi khi tạo study_date_lesson",
				error: error.message,
			});
		}
	},

	async update(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;
			await StudyDateLessonService.update(id, req.body);
			res.json({ message: "Updated" });
		} catch (error: any) {
			res.status(500).json({
				message: "Lỗi khi cập nhật",
				error: error.message,
			});
		}
	},

	async delete(req: Request, res: Response) {
		try {
			const { id } = (req as any).validatedParams;
			await StudyDateLessonService.delete(id);
			res.json({ message: "Deleted" });
		} catch (error: any) {
			res.status(500).json({
				message: "Lỗi khi xóa",
				error: error.message,
			});
		}
	},
};
