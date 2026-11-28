import Database from "../db/database.js";
import UserAuth from '../models/user_auth.js';
import extractTokenFromHeader from '../utils/extract_token.js';
import { generateToken, generateRefreshToken } from '../utils/token_generator.js';
import extractPaylod from '../utils/extract_payload_from_refresh_token.js';
import verificationEvents from '../utils/verification_event.js';
import hashPassword from '../utils/hash_password.js';

class AuthController {

    login = (req, res) => {
        const { email, password } = req.body;
        var token = generateToken({ email: email, password: password });
        var refreshToken = generateRefreshToken({ email: email, password: password });
        res.send({ token: token, refreshToken: refreshToken })
    }

    refreshToken = (req, res) => {
        const { refreshToken } = req.body;
        var payLoad = extractPaylod(refreshToken);
        try {
            var token = generateToken({ email: payLoad.email, password: payLoad.password });
            res.send({ token: token });
        }
        catch (_) {
            res.sendStatus(401).send({ message: 'Session expired. Login again' });
        }
    }

    signUp = async (req, res) => {
        const { email, password } = req.body;
        var hashedPassword = await hashPassword(password);
        let all_users = Database.users;
        let user = new UserAuth(email, hashedPassword);
        all_users.push(user);
        Database.users = all_users;
        res.send({ msg: 'new User added' });
    }

    signout = (req, res) => {

        let token = extractTokenFromHeader(req.headers['authorization']);
        let tokens = Database.tokens;
        let updatedTokens = tokens.filter((t) => t !== token);
        Database.tokens = updatedTokens;
        res.send({ success: true });
    }

    verifyEmail = (req, res) => {
        try {
            const found = verificationEvents.emit(req.query.token);
            if (!found) return res.status(400).send('Link expired or already used.');
            res.send('Email verified! You can return to the app.');
        } catch (err) {
            res.status(400).send('Invalid or expired token.');
        }
    }

}

export default new AuthController();