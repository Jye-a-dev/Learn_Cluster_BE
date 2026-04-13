import { StudyDateLessonService } from "../studyDateLesson/services.js";
export const StudyDateLessonController = {
    async getAll(req, res) {
        try {
            const query = req.validatedQuery;
            const data = await StudyDateLessonService.getAll(query);
            res.json(data);
        }
        catch (error) {
            res.status(500).json({
                message: "Lỗi khi lấy study_date_lessons",
                error: error.message,
            });
        }
    },
    async getById(req, res) {
        try {
            const { id } = req.validatedParams;
            const data = await StudyDateLessonService.getById(id);
            if (!data)
                return res.status(404).json({ message: "Không tìm thấy dữ liệu" });
            res.json(data);
        }
        catch (error) {
            res.status(500).json({
                message: "Lỗi khi lấy dữ liệu",
                error: error.message,
            });
        }
    },
    async count(req, res) {
        try {
            const query = req.validatedQuery;
            const total = await StudyDateLessonService.count(query?.study_date_id, query?.lesson_id);
            res.json({ total });
        }
        catch (error) {
            res.status(500).json({
                message: "Lỗi khi đếm dữ liệu",
                error: error.message,
            });
        }
    },
    async create(req, res) {
        try {
            const id = await StudyDateLessonService.create(req.body);
            res.status(201).json({ id });
        }
        catch (error) {
            res.status(500).json({
                message: "Lỗi khi tạo study_date_lesson",
                error: error.message,
            });
        }
    },
    async update(req, res) {
        try {
            const { id } = req.validatedParams;
            await StudyDateLessonService.update(id, req.body);
            res.json({ message: "Updated" });
        }
        catch (error) {
            res.status(500).json({
                message: "Lỗi khi cập nhật",
                error: error.message,
            });
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.validatedParams;
            await StudyDateLessonService.delete(id);
            res.json({ message: "Deleted" });
        }
        catch (error) {
            res.status(500).json({
                message: "Lỗi khi xóa",
                error: error.message,
            });
        }
    },
};
