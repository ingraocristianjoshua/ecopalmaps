import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

export const sendVerificationEmail = (email: string, token: string) => {
    let transporter = nodemailer.createTransport({
        host: "authsmtp.securemail.pro",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    const link = `${process.env.CORS_ORIGIN}/verify/${token}`;

    ejs.renderFile(
        path.join(__dirname, "/templates/VerifyEmail.ejs"),
        { link: link },
        function (error, data) {
            if (error) {
                console.log(error);
            } else {
                transporter.sendMail({
                    from: "EcoPalMaps <info@ecopalmaps.com>",
                    to: email,
                    subject: "Verifica il tuo account",
                    html: data,
                });
            }
        }
    );
};
