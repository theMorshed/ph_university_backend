import nodemailer from 'nodemailer';
import config from '../config'

export const sendMail = async(to: string, html: string) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: config.NODE_ENV === 'production', // true for port 465, false for other ports
        auth: {
            user: "themorshedctg@gmail.com",
            pass: "ceub ylsf viys dwuj",
        },
    });

    await transporter.sendMail({
        from: 'themorshedctg@gmail.com', // sender address
        to, // list of receivers
        subject: "Change Password Link", // Subject line
        text: "Please Change your password as you want.", // plain text body
        html, // html body
    });
}