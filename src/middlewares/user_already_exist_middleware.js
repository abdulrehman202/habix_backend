import AuthController from "../controllers/auth_controller.js";

export default (async (req, res, next)  => {
    const { email } = req.body;

    let authController = new AuthController();
    let userExist = authController.userExist(email)!=null;

    if (userExist) {
    res.status(401).send({ message: 'User already exist' });
    }

    else {
        next();
    }
});