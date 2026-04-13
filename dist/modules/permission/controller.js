import { PermissionService } from "../permission/services.js";
export const PermissionController = {
    async getAll(req, res) {
        try {
            const query = req.validatedQuery;
            const data = await PermissionService.getAll(query.page, query.limit, query.keyword);
            res.json(data);
        }
        catch (err) {
            res.status(500).json({ message: "Server error" });
        }
    },
    async getById(req, res) {
        try {
            const { id } = req.validatedParams;
            // KHÔNG convert number
            const data = await PermissionService.getById(id);
            if (!data) {
                return res.status(404).json({ message: "Not found" });
            }
            res.json(data);
        }
        catch {
            res.status(500).json({ message: "Server error" });
        }
    },
    async count(req, res) {
        try {
            const total = await PermissionService.count();
            res.json({ total });
        }
        catch {
            res.status(500).json({ message: "Server error" });
        }
    },
    async create(req, res) {
        try {
            const body = req.validatedBody;
            const id = await PermissionService.create(body);
            res.status(201).json({ id });
        }
        catch (err) {
            if (err?.code === "ER_DUP_ENTRY") {
                return res.status(409).json({ message: "Permission name đã tồn tại" });
            }
            res.status(500).json({ message: "Server error" });
        }
    },
    async update(req, res) {
        try {
            const { id } = req.validatedParams;
            const body = req.validatedBody;
            await PermissionService.update(id, body);
            res.json({ message: "Updated" });
        }
        catch {
            res.status(500).json({ message: "Server error" });
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.validatedParams;
            await PermissionService.delete(id);
            res.json({ message: "Deleted" });
        }
        catch {
            res.status(500).json({ message: "Server error" });
        }
    },
};
