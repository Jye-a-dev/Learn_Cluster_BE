import type { Request, Response } from "express";
import { AuthService } from "../auth/auth.service.js";

export const AuthController = {

  async login(req: Request, res: Response) {
    try {
      const body = (req as any).validatedBody;

      const result = await AuthService.login(body.email, body.password);

      if (!result) {
        return res.status(401).json({
          message: "Sai thông tin đăng nhập",
        });
      }

      const { token, user } = result;

      res.cookie("access_token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.json({ user });
    } catch {
      return res.status(500).json({ message: "Server error" });
    }
  },

  async register(req: Request, res: Response) {
    try {
      const body = (req as any).validatedBody;

      const id = await AuthService.register(body);

      return res.status(201).json({ id });
    } catch {
      return res.status(500).json({ message: "Server error" });
    }
  },

  /* ===== GOOGLE LOGIN ===== */

  async googleLogin(req: Request, res: Response) {
    try {

      const { credential } = req.body;

      const result = await AuthService.googleLogin(credential);

      const { token, user } = result;

      res.cookie("access_token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.json({
        message: "Google login success",
        user,
      });

    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: "Google login failed",
      });
    }
  },

  async me(req: Request, res: Response) {
    return res.json((req as any).user);
  },

  async logout(_req: Request, res: Response) {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.json({ message: "Logged out" });
  },
};