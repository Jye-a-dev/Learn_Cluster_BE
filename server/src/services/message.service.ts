import type { Message } from "../@types/message.js";
import { MessageModel } from "../models/message.model.js";

export const MessageService = {
	getByStudyDate: (study_date_id: number) => MessageModel.getByStudyDate(study_date_id),

	getById: (id: number) => MessageModel.getById(id),

	getAll: () => MessageModel.getAll(),

	getBySender: (sender_id: string) => MessageModel.getBySender(sender_id),

	create: (data: Partial<Message>) => MessageModel.create(data),

	delete: (id: number) => MessageModel.delete(id),
	
	update: (id: number, data: Partial<Message>) => MessageModel.update(id, data),

	count: () => MessageModel.count(),
};
