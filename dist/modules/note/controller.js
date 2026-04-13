import { NoteService } from "../note/services.js";
export const NoteController = {
    async getAll(req, res) {
        try {
            const query = req.validatedQuery;
            const notes = await NoteService.getAll(query);
            res.json(notes || []);
        }
        catch (err) {
            console.error("getAll notes error:", err);
            res.status(500).json({
                message: "Server error",
                error: err instanceof Error ? err.message : err,
            });
        }
    },
    async getById(req, res) {
        try {
            const { id } = req.validatedParams;
            if (!id)
                return res.status(400).json({ message: "Yêu cầu Note ID" });
            const note = await NoteService.getById(id);
            if (!note)
                return res.status(404).json({ message: "Không thấy note" });
            res.json(note);
        }
        catch (err) {
            console.error("getById note error:", err);
            res.status(500).json({
                message: "Server error",
                error: err instanceof Error ? err.message : err,
            });
        }
    },
    async create(req, res) {
        try {
            const body = req.validatedBody;
            const id = await NoteService.create(body);
            res.status(201).json({ id });
        }
        catch (err) {
            console.error("create note error:", err);
            res.status(500).json({
                message: "Server error",
                error: err instanceof Error ? err.message : err,
            });
        }
    },
    async update(req, res) {
        try {
            const { id } = req.validatedParams;
            const body = req.validatedBody;
            if (!id)
                return res.status(400).json({ message: "Yêu cầu Note ID" });
            await NoteService.update(id, body);
            res.json({ message: "Note updated" });
        }
        catch (err) {
            console.error("update note error:", err);
            res.status(500).json({
                message: "Server error",
                error: err instanceof Error ? err.message : err,
            });
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.validatedParams;
            if (!id)
                return res.status(400).json({ message: "Yêu cầu Note ID" });
            await NoteService.delete(id);
            res.json({ message: "Note deleted" });
        }
        catch (err) {
            console.error("delete note error:", err);
            res.status(500).json({
                message: "Server error",
                error: err instanceof Error ? err.message : err,
            });
        }
    },
    async getByUser(req, res) {
        const { user_id } = req.validatedParams;
        const notes = await NoteService.getByUser(user_id);
        res.json(notes);
    },
    async getByLesson(req, res) {
        const { lesson_id } = req.validatedParams;
        const notes = await NoteService.getByLesson(lesson_id);
        res.json(notes);
    },
    async count(req, res) {
        const total = await NoteService.count();
        res.json({ total });
    },
};
