import jwt from 'jsonwebtoken';

export default ((token) => {
    try {
        const verifiedPayload = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Valid Token! Data:', verifiedPayload);
    } catch (error) {
        console.error('Invalid or expired token.');
    }
});