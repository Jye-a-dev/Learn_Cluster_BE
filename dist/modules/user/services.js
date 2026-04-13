// src/services/services.ts
import bcrypt from "bcrypt";
import { UserModel } from "../user/model.js";
export const UserService = {
    /* ===================== GET ===================== */
    getAll: (query) => UserModel.getAll(),
    getById: (id) => UserModel.getById(id),
    getFullById: (id) => UserModel.getFullById(id),
    count: () => UserModel.count(),
    getByRole: (role_id) => UserModel.getByRole(role_id),
    countByRole: (role_id) => UserModel.countByRole(role_id),
    search: (q) => UserModel.search(q),
    /* ===================== CREATE ===================== */
    async create(data) {
        const password_hash = await bcrypt.hash(data.password, 10);
        return UserModel.create({
            username: data.username,
            email: data.email,
            password_hash,
        });
    },
    /* ===================== UPDATE ===================== */
    async update(id, data) {
        const updateData = { ...data };
        if (data.password) {
            updateData.password_hash = await bcrypt.hash(data.password, 10);
            delete updateData.password;
        }
        return UserModel.update(id, updateData);
    },
    /* ===================== DELETE ===================== */
    delete: (id) => UserModel.delete(id),
};
