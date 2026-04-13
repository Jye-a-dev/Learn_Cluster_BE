import { ChapterService } from "../chapter/services.js";
export const ChapterController = {
    async getAll(req, res) {
        try {
            const query = req.validatedQuery;
            const chapters = await ChapterService.getAll(query);
            res.json(chapters || []);
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async getById(req, res) {
        try {
            const { id } = req.validatedParams;
            if (!id) {
                return res.status(400).json({ message: "Yêu cầu Chapter ID" });
            }
            const chapter = await ChapterService.getById(id);
            if (!chapter) {
                return res.status(404).json({ message: "Không thấy chapter" });
            }
            res.json(chapter);
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async getByCourse(req, res) {
        try {
            const { course_id } = req.validatedParams;
            console.log("validatedParams:", req.validatedParams);
            const chapters = await ChapterService.getByCourse(course_id);
            res.json(chapters || []);
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async count(req, res) {
        try {
            const query = req.validatedQuery;
            const total = await ChapterService.count(query?.course_id);
            res.json({ total });
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async create(req, res) {
        try {
            const body = req.validatedBody;
            await ChapterService.create(body);
            res.status(201).json({ message: "Chapter created" });
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async update(req, res) {
        try {
            const { id } = req.validatedParams;
            const body = req.validatedBody;
            if (!id) {
                return res.status(400).json({ message: "Yêu cầu Chapter ID" });
            }
            await ChapterService.update(id, body);
            res.json({ message: "Chapter updated" });
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.validatedParams;
            if (!id) {
                return res.status(400).json({ message: "Yêu cầu Chapter ID" });
            }
            await ChapterService.delete(id);
            res.json({ message: "Chapter deleted" });
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        }
    },
};
