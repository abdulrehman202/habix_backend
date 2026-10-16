import verfiyTokenScript from '../utils/verify_token.js';
import extractTokenFromHeader from '../utils/extract_token.js';

export default ((req, res, next) => {
    let token = extractTokenFromHeader(req.headers['authorization']);
    
    let tokenOk = verfiyTokenScript(token);

    if (tokenOk) {
        next();
    }

    else {
        res.send({ result: 'Error' })
    }
});