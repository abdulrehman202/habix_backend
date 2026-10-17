import jwt from 'jsonwebtoken';

export default ((token) => {
    try {
        const verifiedPayload = jwt.verify(token, process.env.JWT_SECRET);
        return true;
    } catch (error) {
        return false
    }
});