import { StudyDateParticipantService } from "../studyDateParticipant/services.js";
export const StudyDateParticipantController = {
    async getByStudyDate(req, res) {
        try {
            const { study_date_id } = req.validatedParams;
            if (!study_date_id)
                return res.status(400).json({ message: "Yêu cầu StudyDate ID" });
            const participants = await StudyDateParticipantService.getByStudyDate(study_date_id);
            res.json(participants || []);
        }
        catch (err) {
            console.error("getByStudyDate error:", err);
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async join(req, res) {
        try {
            const body = req.validatedBody;
            const id = await StudyDateParticipantService.join(body.study_date_id, body.user_id);
            res.status(201).json({ id });
        }
        catch (err) {
            console.error("join error:", err);
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async leave(req, res) {
        try {
            const body = req.validatedBody;
            await StudyDateParticipantService.leave(body.study_date_id, body.user_id);
            res.json({ message: "Left study date" });
        }
        catch (err) {
            console.error("leave error:", err);
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async count(req, res) {
        try {
            const { study_date_id } = req.validatedParams;
            if (!study_date_id)
                return res.status(400).json({ message: "Yêu cầu StudyDate ID" });
            const total = await StudyDateParticipantService.countByStudyDate(study_date_id);
            res.json({ total });
        }
        catch (err) {
            console.error("count error:", err);
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async getAll(req, res) {
        try {
            const data = await StudyDateParticipantService.getAll();
            res.json(data || []);
        }
        catch (err) {
            console.error("getAll error:", err);
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async getByUser(req, res) {
        try {
            const { user_id } = req.validatedParams;
            const data = await StudyDateParticipantService.getByUser(user_id);
            res.json(data || []);
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async countByUser(req, res) {
        try {
            const { user_id } = req.validatedParams;
            const total = await StudyDateParticipantService.countByUser(user_id);
            res.json({ total });
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async checkJoined(req, res) {
        try {
            const { study_date_id, user_id } = req.validatedParams;
            const joined = await StudyDateParticipantService.exists(study_date_id, user_id);
            res.json({ joined });
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        }
    },
    async kick(req, res) {
        try {
            const { study_date_id, user_id } = req.validatedParams;
            await StudyDateParticipantService.removeByStudyDateAndUser(study_date_id, user_id);
            res.json({ message: "Removed participant" });
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        }
    },
};
