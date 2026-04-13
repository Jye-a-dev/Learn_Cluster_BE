import { SubmissionService } from "../submission/services.js";
export const SubmissionController = {
    async getAll(req, res) {
        try {
            const submissions = await SubmissionService.getAll();
            res.json(submissions || []);
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
        }
    },
    async getById(req, res) {
        try {
            const id = req.validatedParams?.id;
            if (!id)
                return res.status(400).json({ message: "Yêu cầu Submission ID" });
            const submission = await SubmissionService.getById(id);
            if (!submission)
                return res.status(404).json({ message: "Không thấy submission" });
            res.json(submission);
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
        }
    },
    async count(req, res) {
        try {
            const total = await SubmissionService.count();
            res.json({ total });
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
        }
    },
    async create(req, res) {
        try {
            const body = req.validatedBody;
            const id = await SubmissionService.create(body);
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
                return res.status(400).json({ message: "Yêu cầu Submission ID" });
            await SubmissionService.update(id, body);
            res.json({ message: "Submission updated" });
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
        }
    },
    async delete(req, res) {
        try {
            const id = req.validatedParams?.id;
            if (!id)
                return res.status(400).json({ message: "Yêu cầu Submission ID" });
            await SubmissionService.delete(id);
            res.json({ message: "Submission deleted" });
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
        }
    },
    async getByAssignment(req, res) {
        try {
            const { assignment_id } = req.validatedParams;
            const data = await SubmissionService.getByAssignment(assignment_id);
            res.json(data || []);
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async countByAssignment(req, res) {
        try {
            const { assignment_id } = req.validatedParams;
            const total = await SubmissionService.countByAssignment(assignment_id);
            res.json({ total });
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async getByStudent(req, res) {
        try {
            const { student_id } = req.validatedParams;
            const data = await SubmissionService.getByStudent(student_id);
            res.json(data || []);
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async countByStudent(req, res) {
        try {
            const { student_id } = req.validatedParams;
            const total = await SubmissionService.countByStudent(student_id);
            res.json({ total });
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async checkSubmitted(req, res) {
        try {
            const { assignment_id, student_id } = req.validatedParams;
            const submission = await SubmissionService.getByAssignmentAndStudent(assignment_id, student_id);
            res.json({ submitted: !!submission, submission });
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        }
    },
};
