import jwt from 'jsonwebtoken'; 
import 'dotenv/config';

export default ((token) => {
    try {
        const payload = jwt.verify(token, process.env.REFRESH_SECRET);
        return payload; 
    } catch (err) {
        console.log(err);
    }
});