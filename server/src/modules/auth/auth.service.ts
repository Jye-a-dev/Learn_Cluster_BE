import bcrypt from "bcryptjs";
import crypto from "crypto";
import { OAuth2Client, LoginTicket } from "google-auth-library";
import { UserModel } from "../user/user.model.js";
import { signToken } from "../../utils/jwt.js";
import { db } from "../../config/db.js";

const STUDENT_ROLE_ID = "879d3f96-ebd2-11f0-b513-acf23c8aac4e";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const AuthService = {

  /* ================= LOGIN ================= */

  async login(email: string, password: string) {

    const [rows]: any = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    const found = rows?.[0];

    if (!found) return null;

    const ok = await bcrypt.compare(password, found.password_hash);

    if (!ok) return null;

    const token = signToken({
      id: found.id,
      role_id: found.role_id,
    });

    return { token, user: found };
  },


  /* ================= REGISTER ================= */

  async register(data: {
    username: string;
    email: string;
    password: string;
  }) {

    const hash = await bcrypt.hash(data.password, 10);

    const id = await UserModel.create({
      username: data.username,
      email: data.email,
      password_hash: hash,
      role_id: STUDENT_ROLE_ID,
    });

    return id;
  },


  /* ================= GOOGLE LOGIN ================= */

  async googleLogin(credential: string) {

    // verify token với Google
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID!,
    }) as LoginTicket;

    const payload = ticket.getPayload();

    if (!payload) {
      throw new Error("Invalid Google token");
    }

    const google_id = payload.sub;
    const email = payload.email!;
    const name = payload.name!;

    const [rows]: any = await db.query(
      "SELECT * FROM users WHERE google_id = ? OR email = ?",
      [google_id, email]
    );

    let user = rows?.[0];

    if (!user) {

      // tạo password random để tránh NULL
      const randomPassword = crypto.randomBytes(32).toString("hex");
      const passwordHash = await bcrypt.hash(randomPassword, 10);

      const id = await UserModel.create({
        username: name,
        email: email,
        google_id: google_id,
        password_hash: passwordHash,
        role_id: STUDENT_ROLE_ID,
      });

      const [newUser]: any = await db.query(
        "SELECT * FROM users WHERE id = ?",
        [id]
      );

      user = newUser?.[0];

    } else if (!user.google_id) {

      // nếu user đã đăng ký email/password trước đó
      // thì cập nhật google_id
      await db.query(
        "UPDATE users SET google_id = ? WHERE id = ?",
        [google_id, user.id]
      );

      user.google_id = google_id;
    }

    const token = signToken({
      id: user.id,
      role_id: user.role_id,
    });

    return { token, user };
  },

};