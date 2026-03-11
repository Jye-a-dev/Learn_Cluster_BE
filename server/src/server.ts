import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import { createRequire } from "module";

import apiRoutes from "./routes/index.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { logger } from "./middlewares/logger.middleware.js";

// =======================
// ENV
// =======================
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// =======================
// COMMONJS MIDDLEWARE (SAFE FOR NODE 22 + ESM)
// =======================
const require = createRequire(import.meta.url);
const cookieParser = require("cookie-parser");

// =======================
// CORS (PHẢI ĐẶT TRƯỚC ROUTES)
// =======================
app.use(
  cors({
    origin: "http://localhost:3100", // Next.js FE
    credentials: true,
  })
);

// =======================
// MIDDLEWARE
// =======================
app.use(express.json());
app.use(cookieParser()); // ✅ FIX CRASH
app.use(logger);

// =======================
// VIEW ENGINE
// =======================
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src/views"));
console.log("SERVER FILE:", import.meta.url);
// =======================
// ROUTES
// =======================
app.use(apiRoutes);

// =======================
// 404
// =======================
app.use((_req, res) => {
  res.status(404).json({ message: "Không tìm thấy route" });
});

// =======================
// ERROR HANDLER
// =======================
app.use(errorHandler);

// =======================
// START SERVER
// =======================
app.listen(PORT, () => {
  console.log("");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("🚀  LearnCluster Server Started");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`🌐  URL        : http://localhost:${PORT}`);
  console.log(`📂  API Prefix : /api/<route>`);
  console.log(`🧩  View Engine: EJS`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("");
  console.log("SERVER RESTART", Date.now());
});
