import type { Request, Response } from "express";
import { ChapterService } from "../services/chapter.service.js";

export const ChapterController = {
  async getAll(req: Request, res: Response) {
    try {
      const query = (req as any).validatedQuery;
      const chapters = await ChapterService.getAll(query);
      res.json(chapters || []);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const { id } = (req as any).validatedParams;
      if (!id) {
        return res.status(400).json({ message: "Yêu cầu Chapter ID" });
      }

      const chapter = await ChapterService.getById(id);
      if (!chapter) {
        return res.status(404).json({ message: "Không thấy chapter" });
      }

      res.json(chapter);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err });
    }
  },

  async getByCourse(req: Request, res: Response) {
    try {
      const { course_id } = (req as any).validatedParams;
      const chapters = await ChapterService.getByCourse(course_id);
      res.json(chapters || []);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err });
    }
  },

  async count(req: Request, res: Response) {
    try {
      const query = (req as any).validatedQuery;
      const total = await ChapterService.count(query?.course_id);
      res.json({ total });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const body = (req as any).validatedBody;
      await ChapterService.create(body);
      res.status(201).json({ message: "Chapter created" });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = (req as any).validatedParams;
      const body = (req as any).validatedBody;

      if (!id) {
        return res.status(400).json({ message: "Yêu cầu Chapter ID" });
      }

      await ChapterService.update(id, body);
      res.json({ message: "Chapter updated" });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = (req as any).validatedParams;
      if (!id) {
        return res.status(400).json({ message: "Yêu cầu Chapter ID" });
      }

      await ChapterService.delete(id);
      res.json({ message: "Chapter deleted" });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err });
    }
  },
};
