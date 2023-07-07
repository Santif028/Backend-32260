import * as nodemailer from  "nodemailer";

export const transporter = nodemailer.createTransport({
    service: 'Gmail',
    port: 587,
    auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASSWORD
    }
})