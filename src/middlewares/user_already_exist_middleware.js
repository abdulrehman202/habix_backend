import AuthController from "../controllers/auth_controller.js";
import nodemailer from 'nodemailer';
import 'dotenv/config';
import verificationEvents from '../utils/verification_event.js';
import crypto from 'crypto';

function waitForLinkClick(token, timeoutMs = 120000) {
    return new Promise((resolve, reject) => {
        const onVerified = () => {
            clearTimeout(timer);
            resolve(true);
        };
        const timer = setTimeout(() => {
            verificationEvents.off(token, onVerified);
            reject(new Error('Verification timed out'));
        }, timeoutMs);
        verificationEvents.once(token, onVerified);
    });
}

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
        const token = crypto.randomBytes(32).toString('hex');
        const url = `http://localhost:${process.env.PORT}/user/verify/?token=${token}`;
        const waiting = waitForLinkClick(token,55000);
        waiting.catch(() => { });
        await transporter.sendMail({
            to: email,
            subject: 'Verify your email',
            html: `Click <a href="${url}">here</a> to verify your email.`
        });
        try{
        await waiting;
        next();}
        catch(_){
            res.status(401).send({ message: 'Email verification failed!' });
        }
    }
});