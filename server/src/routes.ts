import { Router } from 'express'
import { NodemailerMailAdapter } from './adpters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';


export const routes = Router()


routes.post('/feedbacks', async (req, res) => {

    const { comment, type, screenshot } = req.body;

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const nodemailerMailAdapter = new NodemailerMailAdapter();
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbacksRepository, nodemailerMailAdapter);

    const feedback = await submitFeedbackUseCase.execute({
        comment,
        type,
        screenshot
    });

    return res.status(201).send({ data: feedback });
});