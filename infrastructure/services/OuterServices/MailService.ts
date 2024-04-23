import nodemailer from 'nodemailer'

class MailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT || ''),
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })
    }

    async sendActivationMail(to: string, link: string) {
        await this.transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject: 'Activation message for ' + process.env.API_URL,
            text: '',
            html: `
            <div style="text-align: center; font-family: Arial, sans-serif; background-color: #f2f2f2; padding: 20px;">
            <h1 style="color: #333333;">Follow the link to activate your account</h1>
            <a href="${link}" style="display: block; margin-top: 20px; text-decoration: none; color: #007bff; font-size: 18px;">${link}</a>
            </div>
            `
        });
    }
}

export default new MailService()