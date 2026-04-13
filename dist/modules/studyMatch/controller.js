import { StudyMatchService } from "./services.js";
export const StudyMatchController = {
    async getAll(req, res) {
        try {
            const query = req.validatedQuery;
            const matches = await StudyMatchService.getAll(query);
            res.json(matches || []);
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async getById(req, res) {
        try {
            const { id } = req.validatedParams;
            if (!id)
                return res.status(400).json({ message: "Yêu cầu Match ID" });
            const match = await StudyMatchService.getById(id);
            if (!match)
                return res.status(404).json({ message: "Không thấy match" });
            res.json(match);
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async create(req, res) {
        try {
            const body = req.validatedBody;
            const id = await StudyMatchService.create(body);
            res.status(201).json({ id });
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.validatedParams;
            if (!id)
                return res.status(400).json({ message: "Yêu cầu Match ID" });
            await StudyMatchService.delete(id);
            res.json({ message: "Match deleted" });
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async count(req, res) {
        try {
            const total = await StudyMatchService.count();
            res.json({ total });
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        }
    },
};
