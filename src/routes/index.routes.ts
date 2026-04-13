import { Router } from "express";
import { extractRoutes, routeList } from "./route-registry.js";

const router = Router();

/* MOUNT ROUTES */

routeList.forEach((r) => {
	router.use(`/api/${r.name}`, r.router);
});

/* HOME */

router.get("/", (_req, res) => {
	const routes = routeList.flatMap((route) => {
		const prefix = `/api/${route.name}`;
		return extractRoutes(route.router, prefix).map((entry) => ({
			...entry,
			layer: route.layer,
			module: route.name,
		}));
	});

	const layers = {
		learning: {
			name: "Learning Foundation",
			purpose: "Course, content, roadmap progression and assessment operations.",
			modules: routeList.filter((route) => route.layer === "learning").map((route) => route.name),
		},
		intelligence: {
			name: "Knowledge Graph and Signals",
			purpose: "Roadmap, learner signals and guidance-oriented intelligence inputs.",
			modules: routeList.filter((route) => route.layer === "intelligence").map((route) => route.name),
		},
		social: {
			name: "Study Matching and Collaboration",
			purpose: "Matching, study dates, messaging and social learning coordination.",
			modules: routeList.filter((route) => route.layer === "social").map((route) => route.name),
		},
		platform: {
			name: "Platform Operations",
			purpose: "Identity, RBAC and transactional platform support modules.",
			modules: routeList.filter((route) => route.layer === "platform").map((route) => route.name),
		},
	};

	res.json({
		service: "LearnCluster API",
		positioning: "LMS + Knowledge Graph + Study Matching Platform",
		vision: "Help people learn with the right people, at the right time, in the right order.",
		docs: "/api/docs",
		openapi: "/api/openapi.json",
		layers,
		flow: [
			"Goal selection",
			"Roadmap generation",
			"Study matching",
			"Learning and interaction",
			"Feedback loop",
		],
		modules: routeList.map((route) => ({
			name: route.name,
			layer: route.layer,
			description: route.description,
		})),
		routes,
	});
});

export default router;
