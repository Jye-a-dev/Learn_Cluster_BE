import { AssignmentService } from "../assigment/services.js";
export const AssignmentController = {
    async getAll(req, res) {
        try {
            const query = req.validatedQuery;
            const assignments = await AssignmentService.getAll(query);
            res.json(assignments || []);
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async getById(req, res) {
        try {
            const { id } = req.validatedParams;
            if (!id)
                return res.status(400).json({ message: "Yêu cầu Assignment ID" });
            const assignment = await AssignmentService.getById(id);
            if (!assignment)
                return res.status(404).json({ message: "Không thấy assignment" });
            res.json(assignment);
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async getByCourse(req, res) {
        try {
            const { courseId } = req.validatedParams;
            if (!courseId)
                return res.status(400).json({ message: "Yêu cầu Course ID" });
            const assignments = await AssignmentService.getByCourse(courseId);
            res.json(assignments || []);
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async count(req, res) {
        try {
            const total = await AssignmentService.count();
            res.json({ total });
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async create(req, res) {
        try {
            const body = req.validatedBody;
            const id = await AssignmentService.create(body);
            res.status(201).json({ id });
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async update(req, res) {
        try {
            const { id } = req.validatedParams;
            const body = req.validatedBody;
            if (!id)
                return res.status(400).json({ message: "Yêu cầu Assignment ID" });
            await AssignmentService.update(id, body);
            res.json({ message: "Assignment updated" });
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.validatedParams;
            if (!id)
                return res.status(400).json({ message: "Yêu cầu Assignment ID" });
            await AssignmentService.delete(id);
            res.json({ message: "Assignment deleted" });
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async deleteByCourse(req, res) {
        try {
            const { courseId } = req.validatedParams;
            if (!courseId)
                return res.status(400).json({ message: "Yêu cầu Course ID" });
            await AssignmentService.deleteByCourse(courseId);
            res.json({ message: "Assignments deleted" });
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        }
    },
};
