import type { Chapter } from "../@types/chapter.js";
import { ChapterModel } from "../models/chapter.model.js";

export const ChapterService = {
  getAll: () => ChapterModel.getAll(),
  getById: (id: number) => ChapterModel.getById(id),
  create: (chapter: Partial<Chapter>) => ChapterModel.create(chapter),
  update: (id: number, data: Partial<Chapter>) => ChapterModel.update(id, data),
  delete: (id: number) => ChapterModel.delete(id),
  count: () => ChapterModel.count(),
};
