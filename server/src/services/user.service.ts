// src/services/user.service.ts
import type { User } from "../@types/user.js";
import { UserModel } from "../models/user.model.js";

export const UserService = {
	getAll: (query: any) => UserModel.getAll(),
	getById: (id: string) => UserModel.getById(id),
	getFullById: (id: string) => UserModel.getFullById(id),
	create: (user: Partial<User>) => UserModel.create(user),
	update: (id: string, data: Partial<User>) => UserModel.update(id, data),
	delete: (id: string) => UserModel.delete(id),
	count: () => UserModel.count(),
	getByRole: (role_id: number) => UserModel.getByRole(role_id),
	countByRole: (role_id: number) => UserModel.countByRole(role_id),
	search: (q: string) => UserModel.search(q),
};
