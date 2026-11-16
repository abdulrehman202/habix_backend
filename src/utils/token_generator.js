import 'dotenv/config';
import jwt from 'jsonwebtoken';
import database from '../db/database.js';

export default ((userPayload)=>{

// 🔒 Generating/Signing a Token
const token = jwt.sign(userPayload, process.env.JWT_SECRET, { expiresIn: '1h' });
database.tokens.push(token);

return token
});