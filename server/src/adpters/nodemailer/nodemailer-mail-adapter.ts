import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer'


const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "b3f7d5d0798618",
        pass: "f20c116bbfe30b"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail(data: SendMailData) {

        const { body, subject } = data;


        await transport.sendMail({
            from: 'Equipe FeedGet <oi@feedget.com>',
            to: 'Administradores Site Falso <rafaelmenegheti51@gmail.com>',
            subject,
            html: body
        })

    };
};
