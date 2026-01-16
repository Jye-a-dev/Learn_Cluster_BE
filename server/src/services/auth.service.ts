import bcrypt from "bcryptjs";
import { UserModel } from "../models/user.model.js";
import { signToken } from "../utils/jwt.js";

const STUDENT_ROLE_ID = "879d3f96-ebd2-11f0-b513-acf23c8aac4e";

export const AuthService = {
  async login(email: string, password: string) {
    const [user] = (await (await import("../config/db.js")).db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    )) as any;

    const found = user?.[0];
    if (!found) return null;

    const ok = await bcrypt.compare(password, found.password_hash);
    if (!ok) return null;

    const token = signToken({
      id: found.id,
      role_id: found.role_id,
    });

    return { token, user: found };
  },

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
      role_id: STUDENT_ROLE_ID, // AUTO STUDENT
    });

    return id;
  },
};
