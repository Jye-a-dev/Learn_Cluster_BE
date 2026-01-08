import type { Request, Response } from "express";
import { GradeService } from "../services/grade.service.js";

export const GradeController = {
  async getAll(req: Request, res: Response) {
    try {
      const grades = await GradeService.getAll();
      res.json(grades || []);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const id = (req as any).validatedParams?.id;
      if (!id) return res.status(400).json({ message: "Yêu cầu Grade ID" });

      const grade = await GradeService.getById(id);
      if (!grade) return res.status(404).json({ message: "Không thấy grade" });

      res.json(grade);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
    }
  },

  async count(req: Request, res: Response) {
    try {
      const total = await GradeService.count();
      res.json({ total });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const body = (req as any).validatedBody;
      const id = await GradeService.create(body);
      res.status(201).json({ id });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = (req as any).validatedParams?.id;
      const body = (req as any).validatedBody;
      if (!id) return res.status(400).json({ message: "Yêu cầu Grade ID" });

      await GradeService.update(id, body);
      res.json({ message: "Grade updated" });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const id = (req as any).validatedParams?.id;
      if (!id) return res.status(400).json({ message: "Yêu cầu Grade ID" });

      await GradeService.delete(id);
      res.json({ message: "Grade deleted" });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
    }
  },

  // ===== EXTRA CONTROLLER METHODS =====
  async getBySubmission(req: Request, res: Response) {
    try {
      const submission_id = (req as any).validatedParams?.submission_id;
      if (!submission_id) return res.status(400).json({ message: "Yêu cầu submission ID" });

      const grades = await GradeService.getBySubmission(submission_id);
      res.json(grades || []);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
    }
  },

  async getByGrader(req: Request, res: Response) {
    try {
      const grader_id = (req as any).validatedParams?.grader_id;
      if (!grader_id) return res.status(400).json({ message: "Yêu cầu grader ID" });

      const grades = await GradeService.getByGrader(grader_id);
      res.json(grades || []);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
    }
  },

  async updateFeedback(req: Request, res: Response) {
    try {
      const id = (req as any).validatedParams?.id;
      const { feedback } = (req as any).validatedBody;
      if (!id) return res.status(400).json({ message: "Yêu cầu Grade ID" });

      await GradeService.updateFeedback(id, feedback);
      res.json({ message: "Feedback updated" });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
    }
  },

  async getTop(req: Request, res: Response) {
    try {
      const n = parseInt(req.params.n as string, 10) || 10;
      const grades = await GradeService.getTop(n);
      res.json(grades || []);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
    }
  },
};
