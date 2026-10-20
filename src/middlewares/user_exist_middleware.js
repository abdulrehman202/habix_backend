import AuthController from "../controllers/auth_controller.js";
import bcrypt from 'bcrypt';

export default (async (req, res, next)  => {
    const { email,password } = req.body;

    let authController = new AuthController();
    let user = authController.userExist(email);

    if (user !=null) {
        let passwordVerified  = await bcrypt.compare(password,user.password);
        if(passwordVerified)
            {
                next();
            }
            else
                {
                    res.status(401).send({ message: 'Incorrect passsword' })
                }
    }

    else {
        res.status(401).send({ message: 'User does not exist' });
    }
});