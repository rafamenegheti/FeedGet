import { prisma } from "../../prisma";
import { FeedbackCreateData, FeedbacksRepository } from "../feedbacks-repository";

export class PrismaFeedbacksRepository implements FeedbacksRepository {
    async create(data: FeedbackCreateData) {

        const { comment, type, screenshot } = data;

        const feedback = await prisma.feedback.create({
            data: {
                comment,
                type,
                screenshot
            }
        });

        return feedback;
    };   
}