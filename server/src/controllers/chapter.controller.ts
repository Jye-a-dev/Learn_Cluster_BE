import type { Request, Response } from "express";
import { ChapterService } from "../services/chapter.service.js";

export const ChapterController = {
  async getAll(req: Request, res: Response) {
    try {
      const chapters = await ChapterService.getAll();
      res.json(chapters || []);
    } catch (err) {
      console.error("getAll error:", err);
      res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const params = (req as any).validatedParams;
      const id = params?.id;
      if (!id) return res.status(400).json({ message: "Yêu cầu Chapter ID" });

      const chapter = await ChapterService.getById(id);
      if (!chapter) return res.status(404).json({ message: "Không thấy chapter" });

      res.json(chapter);
    } catch (err) {
      console.error("getById error:", err);
      res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
    }
  },

  async count(req: Request, res: Response) {
    try {
      const total = await ChapterService.count();
      res.json({ total });
    } catch (err) {
      console.error("count error:", err);
      res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const body = (req as any).validatedBody;
      const id = await ChapterService.create(body);
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
      if (!id) return res.status(400).json({ message: "Yêu cầu Chapter ID" });

      await ChapterService.update(id, body);
      res.json({ message: "Chapter updated" });
    } catch (err) {
      console.error("update error:", err);
      res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const params = (req as any).validatedParams;
      const id = params?.id;
      if (!id) return res.status(400).json({ message: "Yêu cầu Chapter ID" });

      await ChapterService.delete(id);
      res.json({ message: "Chapter deleted" });
    } catch (err) {
      console.error("delete error:", err);
      res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
    }
  },
};
