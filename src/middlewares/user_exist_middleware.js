import AuthController from "../controllers/auth_controller.js";

export default ((req, res, next) => {
    const { email,password } = req.body;

    let authController = new AuthController();
    let user = authController.userExist(email);

    if (user !=null) {
        if(user.password == password)
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