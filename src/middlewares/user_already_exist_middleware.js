import AuthController from "../controllers/auth_controller.js";
import nodemailer from 'nodemailer';
import 'dotenv/config';

export default (async (req, res, next) => {
    const { email } = req.body;

    let authController = new AuthController();
    let userExist = authController.userExist(email) != null;

    if (userExist) {
        res.status(401).send({ message: 'User already exist' });
    }

    else {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: process.env.EMAIL_ID, pass: process.env.EMAIL_PASSWORD }
        });
        const url = `http://localhost:${process.env.PORT}/user/verify/`;

        await transporter.sendMail({
            to: email,
            subject: 'Verify your email',
            html: `Click <a href="${url}">here</a> to verify your email.`
        });
        next();
    }
});