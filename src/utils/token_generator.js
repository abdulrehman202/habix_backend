import 'dotenv/config';
import jwt from 'jsonwebtoken';
import database from '../db/database.js';


const generateToken = (userPayload)=>{

// 🔒 Generating/Signing a Token
const token = jwt.sign(userPayload, process.env.JWT_SECRET, { expiresIn: '1h' });
database.tokens.push(token);

return token
}

const generateRefreshToken = (userPayload)=>{

const token = jwt.sign(userPayload, process.env.REFRESH_SECRET, { expiresIn: '10d' });
database.tokens.push(token);

return token
}

export {generateToken, generateRefreshToken};