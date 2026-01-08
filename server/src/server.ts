import express from "express";
import dotenv from "dotenv";
import path from "path";
import apiRoutes from "./routes/index.routes.js"; // route tự động
import { errorHandler } from "./middlewares/error.middleware.js";
import { logger } from "./middlewares/logger.middleware.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// JSON parser
app.use(express.json());

// logger
app.use(logger);

// view engine
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src/views"));

// gắn tất cả routes tự động
app.use(apiRoutes);

// 404 handler
app.use((req, res) => res.status(404).json({ message: "Không tìm thấy route" }));

// error handler
app.use(errorHandler);
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
