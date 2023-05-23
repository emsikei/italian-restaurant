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

interface MailOptions {
    from: string;
    to: string;
    subject: string;
    text: string;
    html: string;
    link?: string;
}

export interface IMailService {
    sendMail(options: MailOptions): Promise<void>;
}

export class ResetPasswordLinkMail implements IMailService {
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

    public async sendMail(options: MailOptions): Promise<void> {
        await this.transporter.sendMail({
            from: options.from,
            to: options.to,
            subject: `Vinopizza.md. Password restore`,
            text: '',
            html: `
                <div>
                    <h1>Your password reset link (expires in 5 minutes): <a href="${options.link}">${options.link}</a></h1>
                </div>
            `,
        });
    }
}
