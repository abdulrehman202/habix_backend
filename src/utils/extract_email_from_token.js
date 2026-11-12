import jwt from 'jsonwebtoken'; 

export default ((token) => {
    let email = '';
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        email = payload.email;
    } catch (err) {
        // invalid signature, malformed, or expired
    }
    return email;
});