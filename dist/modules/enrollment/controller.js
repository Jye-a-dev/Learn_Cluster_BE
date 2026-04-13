import { EnrollmentService } from "../enrollment/services.js";
export const EnrollmentController = {
    async getAll(req, res) {
        try {
            const enrollments = await EnrollmentService.getAll();
            res.json(enrollments || []);
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
        }
    },
    async getById(req, res) {
        try {
            const id = req.validatedParams?.id;
            if (!id)
                return res.status(400).json({ message: "Yêu cầu Enrollment ID" });
            const enrollment = await EnrollmentService.getById(id);
            if (!enrollment)
                return res.status(404).json({ message: "Không thấy enrollment" });
            res.json(enrollment);
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
        }
    },
    async count(req, res) {
        try {
            const total = await EnrollmentService.count();
            res.json({ total });
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
        }
    },
    async create(req, res) {
        try {
            const body = req.validatedBody;
            const id = await EnrollmentService.create(body);
            res.status(201).json({ id });
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
        }
    },
    async update(req, res) {
        try {
            const id = req.validatedParams?.id;
            const body = req.validatedBody;
            if (!id)
                return res.status(400).json({ message: "Yêu cầu Enrollment ID" });
            await EnrollmentService.update(id, body);
            res.json({ message: "Enrollment updated" });
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
        }
    },
    async delete(req, res) {
        try {
            const id = req.validatedParams?.id;
            if (!id)
                return res.status(400).json({ message: "Yêu cầu Enrollment ID" });
            await EnrollmentService.delete(id);
            res.json({ message: "Enrollment deleted" });
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
        }
    },
    async getFiltered(req, res) {
        try {
            const query = req.validatedQuery; // { user_id?, course_id?, page?, limit? }
            const enrollments = await EnrollmentService.getFiltered(query);
            res.json(enrollments || []);
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
        }
    },
    async countStudentByCourse(req, res) {
        try {
            const course_id = req.validatedParams?.course_id;
            if (!course_id) {
                return res.status(400).json({ message: "Yêu cầu course_id" });
            }
            const total = await EnrollmentService.countStudentByCourse(course_id);
            res.json({ course_id, total });
        }
        catch (err) {
            res.status(500).json({
                message: "Server error",
                error: err instanceof Error ? err.message : err,
            });
        }
    },
};
