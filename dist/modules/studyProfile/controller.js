import { StudyProfileService } from "./services.js";
export const StudyProfileController = {
    async getAll(req, res) {
        try {
            const query = req.validatedQuery;
            const profiles = await StudyProfileService.getAll(query);
            res.json(profiles || []);
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async getById(req, res) {
        try {
            const { id } = req.validatedParams;
            if (!id)
                return res.status(400).json({ message: "Yêu cầu StudyProfile ID" });
            const profile = await StudyProfileService.getById(id);
            if (!profile)
                return res.status(404).json({ message: "Không thấy study profile" });
            res.json(profile);
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async getByUser(req, res) {
        try {
            const { userId } = req.validatedParams;
            if (!userId)
                return res.status(400).json({ message: "Yêu cầu User ID" });
            const profile = await StudyProfileService.getByUserId(userId);
            if (!profile)
                return res.status(404).json({ message: "Không thấy study profile" });
            res.json(profile);
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async create(req, res) {
        try {
            const body = req.validatedBody;
            const id = await StudyProfileService.create(body);
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
                return res.status(400).json({ message: "Yêu cầu StudyProfile ID" });
            await StudyProfileService.update(id, body);
            res.json({ message: "StudyProfile updated" });
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.validatedParams;
            if (!id)
                return res.status(400).json({ message: "Yêu cầu StudyProfile ID" });
            await StudyProfileService.delete(id);
            res.json({ message: "StudyProfile deleted" });
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async count(req, res) {
        try {
            const total = await StudyProfileService.count();
            res.json({ total });
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        }
    },
};
