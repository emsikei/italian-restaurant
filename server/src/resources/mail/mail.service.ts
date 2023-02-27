import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

interface CustomOptions {
    host: string;
    port: number;
    secure: boolean;
    auth: {
        user: string;
        pass: string;
    };
}

class MailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport<CustomOptions>({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        } as SMTPTransport.Options);
    }

    public async sendPasswordResetLink(to: string, link: string): Promise<void> {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: `Vinopizza.md. Password restore`,
            text: '',
            html: `
                <div>
                    <h1>Your password reset link (expires in 5 minutes): <a href="${link}">${link}</a></h1>
                </div>
            `,
        });
    }
}

export default MailService;

export {};
