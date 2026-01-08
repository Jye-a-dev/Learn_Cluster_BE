// src/services/bookmark.service.ts
import type { Bookmark } from "../@types/bookmark.js";
import { BookmarkModel } from "../models/bookmark.model.js";

export const BookmarkService = {
	getAll: (query?: any) => BookmarkModel.getAll(),
	getById: (id: number) => BookmarkModel.getById(id),
	getByUser: (user_id: string) => BookmarkModel.getByUser(user_id),
	create: (bookmark: Partial<Bookmark>) => BookmarkModel.create(bookmark),
	delete: (id: number) => BookmarkModel.delete(id),
	count: () => BookmarkModel.count(),
};
