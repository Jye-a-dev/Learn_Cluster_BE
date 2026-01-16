import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";

import apiRoutes from "./routes/index.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { logger } from "./middlewares/logger.middleware.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

/* =======================
   CORS (PHẢI ĐẶT TRƯỚC ROUTES)
======================= */
app.use(
  cors({
    origin: "http://localhost:3100", // FE Next.js
    credentials: true,
  })
);

/* =======================
   MIDDLEWARE
======================= */

// JSON parser
app.use(express.json());

// logger
app.use(logger);

/* =======================
   VIEW ENGINE
======================= */

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src/views"));

/* =======================
   ROUTES
======================= */

app.use(apiRoutes);

/* =======================
   404 & ERROR
======================= */

app.use((req, res) =>
  res.status(404).json({ message: "Không tìm thấy route" })
);

app.use(errorHandler);

/* =======================
   START SERVER
======================= */

app.listen(PORT, () => {
  console.log("");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("🚀  LearnCluster Server Started");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`🌐  URL        : http://localhost:${PORT}/`);
  console.log(`📂  API Prefix : /api/<route>`);
  console.log(`🧩  View Engine: EJS`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("");
});
