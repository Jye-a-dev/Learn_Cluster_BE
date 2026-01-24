// src/services/user.service.ts
import bcrypt from "bcrypt";
import type { User } from "../@types/user.js";
import { UserModel } from "../models/user.model.js";

export const UserService = {
  /* ===================== GET ===================== */
  getAll: (query: any) => UserModel.getAll(),
  getById: (id: string) => UserModel.getById(id),
  getFullById: (id: string) => UserModel.getFullById(id),
  count: () => UserModel.count(),
  getByRole: (role_id: number) => UserModel.getByRole(role_id),
  countByRole: (role_id: number) => UserModel.countByRole(role_id),
  search: (q: string) => UserModel.search(q),

  /* ===================== CREATE ===================== */
  async create(data: {
    username: string;
    email: string;
    password: string;
  }): Promise<string> {
    const password_hash = await bcrypt.hash(data.password, 10);

    return UserModel.create({
      username: data.username,
      email: data.email,
      password_hash,
      // ❗ role_id KHÔNG nhận từ FE
    });
  },

  /* ===================== UPDATE ===================== */
  async update(
    id: string,
    data: Partial<User & { password?: string }>
  ): Promise<User | null> {
    const updateData: any = { ...data };

    if (data.password) {
      updateData.password_hash = await bcrypt.hash(data.password, 10);
      delete updateData.password;
    }

    return UserModel.update(id, updateData);
  },

  /* ===================== DELETE ===================== */
  delete: (id: string) => UserModel.delete(id),
};
