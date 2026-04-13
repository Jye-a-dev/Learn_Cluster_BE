import { CourseService } from "../course/services.js";
export const CourseController = {
    // ===== GET ALL (FILTERED) =====
    async getAll(req, res) {
        try {
            const query = req.validatedQuery;
            const courses = await CourseService.getFiltered(query);
            res.json(courses);
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Lỗi khi lấy danh sách courses", error: error.message });
        }
    },
    // ===== GET BY ID (UUID) =====
    async getById(req, res) {
        try {
            const { id } = req.validatedParams;
            if (!id)
                return res.status(400).json({ message: "Yêu cầu Course ID" });
            const course = await CourseService.getById(id);
            if (!course)
                return res.status(404).json({ message: "Không thấy course" });
            res.json(course);
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Lỗi khi lấy course", error: error.message });
        }
    },
    // ===== COUNT =====
    async count(req, res) {
        try {
            const query = req.validatedQuery;
            const total = await CourseService.count(query?.status, query?.search);
            res.json({ total });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Lỗi khi đếm courses", error: error.message });
        }
    },
    // ===== CREATE =====
    async create(req, res) {
        try {
            const id = await CourseService.create(req.body);
            res.status(201).json({ id });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Lỗi khi tạo course", error: error.message });
        }
    },
    // ===== UPDATE =====
    async update(req, res) {
        try {
            const { id } = req.validatedParams;
            if (!id)
                return res.status(400).json({ message: "Yêu cầu Course ID" });
            await CourseService.update(id, req.body);
            res.json({ message: "Course updated" });
        }
        catch (error) {
            res.status(500).json({
                message: "Lỗi khi cập nhật course",
                error: error.message,
            });
        }
    },
    // ===== DELETE =====
    async delete(req, res) {
        try {
            const { id } = req.validatedParams;
            if (!id)
                return res.status(400).json({ message: "Yêu cầu Course ID" });
            await CourseService.delete(id);
            res.json({ message: "Course deleted" });
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Lỗi khi xóa course", error: error.message });
        }
    },
};
