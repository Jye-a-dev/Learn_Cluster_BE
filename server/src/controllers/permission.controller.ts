import type { Request, Response } from "express";
import { PermissionService } from "../services/permission.service.js";

export const PermissionController = {
  async getAll(req: Request, res: Response) {
    try {
      const permissions = await PermissionService.getAll();
      res.json(permissions || []);
    } catch (err) {
      console.error("getAll error:", err);
      res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const params = (req as any).validatedParams;
      const id = params?.id;
      if (!id) return res.status(400).json({ message: "Yêu cầu Permission ID" });

      const permission = await PermissionService.getById(id);
      if (!permission) return res.status(404).json({ message: "Không thấy permission" });

      res.json(permission);
    } catch (err) {
      console.error("getById error:", err);
      res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
    }
  },

  async count(req: Request, res: Response) {
    try {
      const total = await PermissionService.count();
      res.json({ total });
    } catch (err) {
      console.error("count error:", err);
      res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const body = (req as any).validatedBody;
      const id = await PermissionService.create(body);
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
      if (!id) return res.status(400).json({ message: "Yêu cầu Permission ID" });

      await PermissionService.update(id, body);
      res.json({ message: "Permission updated" });
    } catch (err) {
      console.error("update error:", err);
      res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const params = (req as any).validatedParams;
      const id = params?.id;
      if (!id) return res.status(400).json({ message: "Yêu cầu Permission ID" });

      await PermissionService.delete(id);
      res.json({ message: "Permission deleted" });
    } catch (err) {
      console.error("delete error:", err);
      res.status(500).json({ message: "Server error", error: err instanceof Error ? err.message : err });
    }
  },
};
