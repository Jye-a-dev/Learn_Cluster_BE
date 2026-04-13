import { AuthService } from "../auth/services.js";
export const AuthController = {
    googleConfig(_req, res) {
        const clientId = process.env.GOOGLE_CLIENT_ID?.trim() ||
            process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID?.trim() ||
            null;
        if (!clientId) {
            return res.status(503).json({
                message: "Google OAuth is not configured. Add GOOGLE_CLIENT_ID to server/.env or NEXT_PUBLIC_GOOGLE_CLIENT_ID to the client.",
                clientId: null,
            });
        }
        return res.json({ clientId });
    },
    async login(req, res) {
        try {
            const body = req.validatedBody;
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
        }
        catch {
            return res.status(500).json({ message: "Server error" });
        }
    },
    async register(req, res) {
        try {
            const body = req.validatedBody;
            const id = await AuthService.register(body);
            return res.status(201).json({ id });
        }
        catch {
            return res.status(500).json({ message: "Server error" });
        }
    },
    /* ===== GOOGLE LOGIN ===== */
    async googleLogin(req, res) {
        try {
            const googleClientId = process.env.GOOGLE_CLIENT_ID?.trim() ||
                process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID?.trim();
            if (!googleClientId) {
                return res.status(503).json({
                    message: "Google login is not configured on the server. Missing GOOGLE_CLIENT_ID.",
                });
            }
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
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({
                message: "Google login failed",
            });
        }
    },
    async me(req, res) {
        return res.json(req.user);
    },
    async logout(_req, res) {
        res.clearCookie("access_token", {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });
        return res.json({ message: "Logged out" });
    },
};
