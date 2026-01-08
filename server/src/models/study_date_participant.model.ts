// src/models/study_date_participant.model.ts
import type { StudyDateParticipant } from "../@types/study_date_participant.js";
import { db as pool } from "../config/db.js";

export const StudyDateParticipantModel = {
	async getByStudyDate(study_date_id: number): Promise<StudyDateParticipant[]> {
		const [rows] = await pool.query("SELECT * FROM study_date_participants WHERE study_date_id = ?", [study_date_id]);
		return rows as StudyDateParticipant[];
	},

	async join(study_date_id: number, user_id: string): Promise<number> {
		const [result] = await pool.query("INSERT INTO study_date_participants (study_date_id, user_id) VALUES (?, ?)", [study_date_id, user_id]);
		return (result as any).insertId;
	},

	async leave(study_date_id: number, user_id: string): Promise<void> {
		await pool.query("DELETE FROM study_date_participants WHERE study_date_id = ? AND user_id = ?", [study_date_id, user_id]);
	},
	async getAll(): Promise<StudyDateParticipant[]> {
		const [rows] = await pool.query("SELECT * FROM study_date_participants");
		return rows as StudyDateParticipant[];
	},

	async countByStudyDate(study_date_id: number): Promise<number> {
		const [rows] = await pool.query("SELECT COUNT(*) as total FROM study_date_participants WHERE study_date_id = ?", [study_date_id]);
		return (rows as any)[0].total || 0;
	},
};
