import type { Request, Response } from "express";
import { LessonService } from "../services/lesson.service.js";

export const LessonController = {
  async getAll(req: Request, res: Response) {
    try {
      const lessons = await LessonService.getAll();
      res.json(lessons || []);
    } catch (err) {
      console.error("getAll error:", err);
      res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const params = (req as any).validatedParams;
      const id = params?.id;
      if (!id) return res.status(400).json({ message: "Yêu cầu Lesson ID" });

      const lesson = await LessonService.getById(id);
      if (!lesson) return res.status(404).json({ message: "Không thấy lesson" });

      res.json(lesson);
    } catch (err) {
      console.error("getById error:", err);
      res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
    }
  },

  async count(req: Request, res: Response) {
    try {
      const total = await LessonService.count();
      res.json({ total });
    } catch (err) {
      console.error("count error:", err);
      res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const body = (req as any).validatedBody;
      const id = await LessonService.create(body);
      res.status(201).json({ id });
    } catch (err) {
      console.error("create error:", err);
      res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const params = (req as any).validatedParams;
      const body = (req as any).validatedBody;
      const id = params?.id;
      if (!id) return res.status(400).json({ message: "Yêu cầu Lesson ID" });

      await LessonService.update(id, body);
      res.json({ message: "Lesson updated" });
    } catch (err) {
      console.error("update error:", err);
      res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const params = (req as any).validatedParams;
      const id = params?.id;
      if (!id) return res.status(400).json({ message: "Yêu cầu Lesson ID" });

      await LessonService.delete(id);
      res.json({ message: "Lesson deleted" });
    } catch (err) {
      console.error("delete error:", err);
      res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
    }
  },
};
