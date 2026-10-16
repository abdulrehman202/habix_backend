import 'dotenv/config';
import jwt from 'jsonwebtoken';

export default ((userPayload)=>{

// 🔒 Generating/Signing a Token
const token = jwt.sign(userPayload, process.env.JWT_SECRET, { expiresIn: '1h' });

return token
});