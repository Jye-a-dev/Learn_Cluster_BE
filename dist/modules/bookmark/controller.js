import { BookmarkService } from "../bookmark/services.js";
export const BookmarkController = {
    async getAll(req, res) {
        try {
            const query = req.validatedQuery;
            const bookmarks = await BookmarkService.getAll(query);
            res.json(bookmarks || []);
        }
        catch (err) {
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
                return res.status(400).json({ message: "Yêu cầu Bookmark ID" });
            const bookmark = await BookmarkService.getById(id);
            if (!bookmark)
                return res.status(404).json({ message: "Không thấy bookmark" });
            res.json(bookmark);
        }
        catch (err) {
            res.status(500).json({
                message: "Server error",
                error: err instanceof Error ? err.message : err,
            });
        }
    },
    async getByUser(req, res) {
        try {
            const { userId } = req.validatedParams;
            const bookmarks = await BookmarkService.getByUser(userId);
            res.json(bookmarks || []);
        }
        catch (err) {
            res.status(500).json({
                message: "Server error",
                error: err instanceof Error ? err.message : err,
            });
        }
    },
    async getByLesson(req, res) {
        try {
            const { lessonId } = req.validatedParams;
            const bookmarks = await BookmarkService.getByLesson(lessonId);
            res.json(bookmarks || []);
        }
        catch (err) {
            res.status(500).json({
                message: "Server error",
                error: err instanceof Error ? err.message : err,
            });
        }
    },
    async create(req, res) {
        try {
            const body = req.validatedBody;
            const id = await BookmarkService.create(body);
            res.status(201).json({ id });
        }
        catch (err) {
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
            await BookmarkService.update(id, body);
            res.json({ message: "Bookmark updated" });
        }
        catch (err) {
            res.status(500).json({
                message: "Server error",
                error: err instanceof Error ? err.message : err,
            });
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.validatedParams;
            await BookmarkService.delete(id);
            res.json({ message: "Bookmark deleted" });
        }
        catch (err) {
            res.status(500).json({
                message: "Server error",
                error: err instanceof Error ? err.message : err,
            });
        }
    },
    async deleteByUserLesson(req, res) {
        try {
            const { user_id, lesson_id } = req.validatedBody;
            await BookmarkService.deleteByUserLesson(user_id, lesson_id);
            res.json({ message: "Bookmark deleted" });
        }
        catch (err) {
            res.status(500).json({
                message: "Server error",
                error: err instanceof Error ? err.message : err,
            });
        }
    },
};
