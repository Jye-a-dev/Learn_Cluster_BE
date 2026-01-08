import type { Message } from "../@types/message.js";
import { MessageModel } from "../models/message.model.js";

export const MessageService = {
	getByStudyDate: (study_date_id: number) =>
		MessageModel.getByStudyDate(study_date_id),

	getById: (id: number) =>
		MessageModel.getById(id),

	getAll: () =>
		MessageModel.getAll(),

	create: (data: Partial<Message>) =>
		MessageModel.create(data),

	delete: (id: number) =>
		MessageModel.delete(id),
};
