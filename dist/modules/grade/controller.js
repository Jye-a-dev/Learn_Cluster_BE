import { GradeService } from "../grade/services.js";
export const GradeController = {
    async getAll(req, res) {
        try {
            const grades = await GradeService.getAll();
            res.json(grades || []);
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
        }
    },
    async getById(req, res) {
        try {
            const id = req.validatedParams?.id;
            if (!id)
                return res.status(400).json({ message: "Yêu cầu Grade ID" });
            const grade = await GradeService.getById(id);
            if (!grade)
                return res.status(404).json({ message: "Không thấy grade" });
            res.json(grade);
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
        }
    },
    async count(req, res) {
        try {
            const total = await GradeService.count();
            res.json({ total });
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
        }
    },
    async create(req, res) {
        try {
            const body = req.validatedBody;
            const id = await GradeService.create(body);
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
                return res.status(400).json({ message: "Yêu cầu Grade ID" });
            await GradeService.update(id, body);
            res.json({ message: "Grade updated" });
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
        }
    },
    async delete(req, res) {
        try {
            const id = req.validatedParams?.id;
            if (!id)
                return res.status(400).json({ message: "Yêu cầu Grade ID" });
            await GradeService.delete(id);
            res.json({ message: "Grade deleted" });
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
        }
    },
    // ===== EXTRA CONTROLLER METHODS =====
    async getBySubmission(req, res) {
        try {
            const submission_id = req.validatedParams?.submission_id;
            if (!submission_id)
                return res.status(400).json({ message: "Yêu cầu submission ID" });
            const grades = await GradeService.getBySubmission(submission_id);
            res.json(grades || []);
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
        }
    },
    async getByGrader(req, res) {
        try {
            const grader_id = req.validatedParams?.grader_id;
            if (!grader_id)
                return res.status(400).json({ message: "Yêu cầu grader ID" });
            const grades = await GradeService.getByGrader(grader_id);
            res.json(grades || []);
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
        }
    },
    async updateFeedback(req, res) {
        try {
            const id = req.validatedParams?.id;
            const { feedback } = req.validatedBody;
            if (!id)
                return res.status(400).json({ message: "Yêu cầu Grade ID" });
            await GradeService.updateFeedback(id, feedback);
            res.json({ message: "Feedback updated" });
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
        }
    },
    async getTop(req, res) {
        try {
            const n = parseInt(req.params.n, 10) || 10;
            const grades = await GradeService.getTop(n);
            res.json(grades || []);
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
        }
    },
};
