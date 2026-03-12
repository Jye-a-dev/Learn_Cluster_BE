import { Router } from "express";

/* MODULE ROUTES */
import achievementRoutes from "../modules/achievement/achievement.routes.js";
import assignmentRoutes from "../modules/assigment/assignment.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";
import bookmarkRoutes from "../modules/bookmark/bookmark.routes.js";
import chapterRoutes from "../modules/chapter/chapter.routes.js";
import courseRoutes from "../modules/course/course.routes.js";
import courseInstructorRoutes from "../modules/courseInstructor/course_instructor.routes.js";
import enrollmentRoutes from "../modules/enrollment/enrollment.routes.js";
import gradeRoutes from "../modules/grade/grade.routes.js";
import lessonRoutes from "../modules/lesson/lesson.routes.js";
import messageRoutes from "../modules/message/message.routes.js";
import noteRoutes from "../modules/note/note.routes.js";
import notificationRoutes from "../modules/notification/notification.routes.js";
import orderRoutes from "../modules/order/order.routes.js";
import orderItemRoutes from "../modules/orderItem/order_item.routes.js";
import paymentRoutes from "../modules/payment/payment.routes.js";
import permissionRoutes from "../modules/permission/permission.routes.js";
import planRoutes from "../modules/plan/plan.routes.js";
import roleRoutes from "../modules/role/role.routes.js";
import rolePermissionRoutes from "../modules/rolePermisson/role_permission.routes.js";
import studyDateRoutes from "../modules/studyDate/study_date.routes.js";
import studyDateLessonRoutes from "../modules/studyDateLesson/study_date_lesson.routes.js";
import studyDateParticipantRoutes from "../modules/studyDateParticipant/study_date_participant.routes.js";
import studyMatchRoutes from "../modules/studyMatch/study_match.routes.js";
import studyProfileRoutes from "../modules/studyProfile/study_profile.routes.js";
import studySwipeRoutes from "../modules/studySwipe/study_swipe.routes.js";
import submissionRoutes from "../modules/submission/submission.routes.js";
import userRoutes from "../modules/user/user.routes.js";

const router = Router();

/* ROUTE LIST */

const routeList = [
	{ name: "achievement", router: achievementRoutes },
	{ name: "assignment", router: assignmentRoutes },
	{ name: "auth", router: authRoutes },
	{ name: "bookmark", router: bookmarkRoutes },
	{ name: "chapter", router: chapterRoutes },
	{ name: "course", router: courseRoutes },
	{ name: "course_instructor", router: courseInstructorRoutes },
	{ name: "enrollment", router: enrollmentRoutes },
	{ name: "grade", router: gradeRoutes },
	{ name: "lesson", router: lessonRoutes },
	{ name: "message", router: messageRoutes },
	{ name: "note", router: noteRoutes },
	{ name: "notification", router: notificationRoutes },
	{ name: "order", router: orderRoutes },
	{ name: "order_item", router: orderItemRoutes },
	{ name: "payment", router: paymentRoutes },
	{ name: "permission", router: permissionRoutes },
	{ name: "plan", router: planRoutes },
	{ name: "role", router: roleRoutes },
	{ name: "role_permission", router: rolePermissionRoutes },
	{ name: "study_date", router: studyDateRoutes },
	{ name: "study_date_lesson", router: studyDateLessonRoutes },
	{ name: "study_date_participant", router: studyDateParticipantRoutes },
	{ name: "study_match", router: studyMatchRoutes },
	{ name: "study_profile", router: studyProfileRoutes },
	{ name: "study_swipe", router: studySwipeRoutes },
	{ name: "submission", router: submissionRoutes },
	{ name: "user", router: userRoutes },
];

/* EXTRACT API */

function extractRoutes(router: any, prefix: string) {
	const routes: { methods: string; path: string }[] = [];

	router.stack?.forEach((layer: any) => {
		if (layer.route) {
			const methods = Object.keys(layer.route.methods)
				.map((m: string) => m.toUpperCase())
				.join(", ");

			routes.push({
				methods,
				path: prefix + layer.route.path,
			});
		}
	});

	return routes;
}

/* MOUNT ROUTES */

routeList.forEach((r) => {
	router.use(`/api/${r.name}`, r.router);

	if (r.name === "auth") {
		router.get("/api/auth/html", (req, res) => {
			res.redirect("/api/user/html");
		});
		return;
	}

	router.get(`/api/${r.name}/html`, async (req, res) => {
		try {
			const response = await fetch(`http://localhost:3000/api/${r.name}`);
			const json = await response.json();

			let data: any[] = [];

			if (Array.isArray(json)) data = json;
			else if (Array.isArray(json.data)) data = json.data;

			const columns = data.length ? Object.keys(data[0]) : [];
			const apiRoutes = extractRoutes(r.router, `/api/${r.name}`);

			res.render("data", {
				title: r.name.toUpperCase(),
				columns,
				data,
				apiRoutes,
			});
		} catch {
			res.render("data", {
				title: r.name.toUpperCase(),
				columns: [],
				data: [],
				apiRoutes: [],
			});
		}
	});
});

/* HOME */

router.get("/", (req, res) => {
	res.render("index", {
		routes: routeList.map((r) => r.name),
	});
});

export default router;
