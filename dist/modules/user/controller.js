import { UserService } from "../user/services.js";
export const UserController = {
    /* ================= USERS ================= */
    async getAll(req, res) {
        try {
            const query = req.validatedQuery;
            const users = await UserService.getAll(query);
            res.json(users || []);
        }
        catch {
            res.status(500).json({ message: "Server error" });
        }
    },
    async getById(req, res) {
        try {
            const id = req.validatedParams?.id;
            if (!id)
                return res.status(400).json({ message: "User ID required" });
            const user = await UserService.getById(id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json(user);
        }
        catch {
            res.status(500).json({ message: "Server error" });
        }
    },
    async getFullById(req, res) {
        try {
            const id = req.validatedParams?.id;
            if (!id) {
                return res.status(400).json({ message: "User ID required" });
            }
            const user = await UserService.getFullById(id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json(user);
        }
        catch {
            res.status(500).json({ message: "Server error" });
        }
    },
    async count(req, res) {
        try {
            const count = await UserService.count();
            res.json({
                count,
            });
        }
        catch {
            res.status(500).json({ message: "Server error" });
        }
    },
    async getByRole(req, res) {
        try {
            const role_id = req.validatedParams?.role_id;
            const users = await UserService.getByRole(role_id);
            res.json(users || []);
        }
        catch {
            res.status(500).json({ message: "Server error" });
        }
    },
    async countByRole(req, res) {
        try {
            const role_id = req.validatedParams?.role_id;
            const count = await UserService.countByRole(role_id);
            res.json({
                role_id,
                count,
            });
        }
        catch {
            res.status(500).json({ message: "Server error" });
        }
    },
    async create(req, res) {
        try {
            const body = req.validatedBody;
            const id = await UserService.create(body);
            res.status(201).json({ id });
        }
        catch {
            res.status(500).json({ message: "Server error" });
        }
    },
    async update(req, res) {
        try {
            const params = req.validatedParams;
            const body = req.validatedBody;
            const id = params?.id;
            if (!id) {
                return res.status(400).json({ message: "User ID required" });
            }
            await UserService.update(id, body);
            res.json({ message: "User updated" });
        }
        catch {
            res.status(500).json({ message: "Server error" });
        }
    },
    async delete(req, res) {
        try {
            const id = req.validatedParams?.id;
            if (!id) {
                return res.status(400).json({ message: "User ID required" });
            }
            await UserService.delete(id);
            res.json({
                message: "User deleted",
            });
        }
        catch {
            res.status(500).json({ message: "Server error" });
        }
    },
    async search(req, res) {
        try {
            const q = req.validatedQuery?.q;
            const users = await UserService.search(q);
            res.json(users || []);
        }
        catch {
            res.status(500).json({ message: "Server error" });
        }
    },
};
