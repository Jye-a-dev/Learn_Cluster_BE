import type { Lesson } from "../@types/lesson.js";
import { LessonModel } from "../models/lesson.model.js";

export const LessonService = {
  getAll: () => LessonModel.getAll(),
  getById: (id: number) => LessonModel.getById(id),
  create: (lesson: Partial<Lesson>) => LessonModel.create(lesson),
  update: (id: number, data: Partial<Lesson>) => LessonModel.update(id, data),
  delete: (id: number) => LessonModel.delete(id),
  count: () => LessonModel.count(),
};
