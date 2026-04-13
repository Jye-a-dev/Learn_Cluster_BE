import { AchievementService } from "../achievement/services.js";
export const AchievementController = {
    async getAll(req, res) {
        try {
            const achievements = await AchievementService.getAll();
            res.json(achievements || []);
        }
        catch (err) {
            console.error("getAll achievement error:", err);
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async getById(req, res) {
        try {
            const { id } = req.validatedParams;
            if (!id)
                return res.status(400).json({ message: "Yêu cầu Achievement ID" });
            const achievement = await AchievementService.getById(id);
            if (!achievement)
                return res.status(404).json({ message: "Không thấy achievement" });
            res.json(achievement);
        }
        catch (err) {
            console.error("getById achievement error:", err);
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async getByUser(req, res) {
        try {
            const { userId } = req.validatedParams;
            if (!userId)
                return res.status(400).json({ message: "Yêu cầu User ID" });
            const achievements = await AchievementService.getByUser(userId);
            res.json(achievements || []);
        }
        catch (err) {
            console.error("getByUser achievement error:", err);
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async count(req, res) {
        try {
            const total = await AchievementService.count();
            res.json({ total });
        }
        catch (err) {
            console.error("count achievement error:", err);
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async create(req, res) {
        try {
            const body = req.validatedBody;
            const id = await AchievementService.create(body);
            res.status(201).json({ id });
        }
        catch (err) {
            console.error("create achievement error:", err);
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async bulkCreate(req, res) {
        try {
            const body = req.validatedBody;
            await AchievementService.bulkCreate(body);
            res.status(201).json({ message: "Achievements created" });
        }
        catch (err) {
            console.error("bulkCreate achievement error:", err);
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async update(req, res) {
        try {
            const { id } = req.validatedParams;
            const body = req.validatedBody;
            if (!id)
                return res.status(400).json({ message: "Yêu cầu Achievement ID" });
            await AchievementService.update(id, body);
            res.json({ message: "Achievement updated" });
        }
        catch (err) {
            console.error("update achievement error:", err);
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.validatedParams;
            if (!id)
                return res.status(400).json({ message: "Yêu cầu Achievement ID" });
            await AchievementService.delete(id);
            res.json({ message: "Achievement deleted" });
        }
        catch (err) {
            console.error("delete achievement error:", err);
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async deleteByUser(req, res) {
        try {
            const { userId } = req.validatedParams;
            if (!userId)
                return res.status(400).json({ message: "Yêu cầu User ID" });
            await AchievementService.deleteByUser(userId);
            res.json({ message: "Achievements deleted" });
        }
        catch (err) {
            console.error("deleteByUser achievement error:", err);
            res.status(500).json({ message: "Server error", error: err });
        }
    },
};
