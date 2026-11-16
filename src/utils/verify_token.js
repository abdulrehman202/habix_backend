import 'dotenv/config';
import jwt from 'jsonwebtoken';
import database from '../db/database.js';

export default ((token) => {
    try {
        const verifiedPayload = jwt.verify(token, process.env.JWT_SECRET);
        return verifiedPayload.email !=null && verifiedPayload.email != undefined && database.tokens.includes(token);
    } catch (error) {
        return false
    }
});