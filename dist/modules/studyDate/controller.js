import { StudyDateService } from "../studyDate/services.js";
export const StudyDateController = {
    async getFullById(req, res) {
        try {
            const { id } = req.validatedParams;
            if (!id)
                return res.status(400).json({ message: "Yêu cầu StudyDate ID" });
            const studyDate = await StudyDateService.getFullById(id);
            if (!studyDate)
                return res.status(404).json({ message: "Không thấy study date" });
            res.json(studyDate);
        }
        catch (err) {
            console.error("getFullById error:", err);
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async getAll(req, res) {
        try {
            const query = req.validatedQuery;
            const studyDates = await StudyDateService.query(query);
            res.json(studyDates || []);
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async getById(req, res) {
        try {
            const { id } = req.validatedParams;
            if (!id)
                return res.status(400).json({ message: "Yêu cầu StudyDate ID" });
            const studyDate = await StudyDateService.getById(id);
            if (!studyDate)
                return res.status(404).json({ message: "Không thấy study date" });
            res.json(studyDate);
        }
        catch (err) {
            console.error("getById error:", err);
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async getByCourse(req, res) {
        try {
            const { course_id } = req.validatedParams;
            if (!course_id)
                return res.status(400).json({ message: "Yêu cầu Course ID" });
            const studyDates = await StudyDateService.getByCourse(course_id);
            res.json(studyDates || []);
        }
        catch (err) {
            console.error("getByCourse error:", err);
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async getUpcoming(req, res) {
        try {
            const data = await StudyDateService.getUpcoming();
            res.json(data || []);
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async count(req, res) {
        try {
            const total = await StudyDateService.count();
            res.json({ total });
        }
        catch (err) {
            console.error("count error:", err);
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async create(req, res) {
        try {
            const body = req.validatedBody;
            const id = await StudyDateService.create(body);
            res.status(201).json({ id });
        }
        catch (err) {
            console.error("create error:", err);
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async update(req, res) {
        try {
            const { id } = req.validatedParams;
            const body = req.validatedBody;
            if (!id)
                return res.status(400).json({ message: "Yêu cầu StudyDate ID" });
            await StudyDateService.update(id, body);
            res.json({ message: "Study date updated" });
        }
        catch (err) {
            console.error("update error:", err);
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.validatedParams;
            if (!id)
                return res.status(400).json({ message: "Yêu cầu StudyDate ID" });
            await StudyDateService.delete(id);
            res.json({ message: "Study date deleted" });
        }
        catch (err) {
            console.error("delete error:", err);
            res.status(500).json({ message: "Server error", error: err });
        }
    },
};
