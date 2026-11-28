import bcrypt from 'bcrypt';
import db from '../db/database.js'

export default (async (req, res, next)  => {
    const { email,password } = req.body;
    let all_users = db.users;
    let user = all_users.find((element) => element.email == email);

    if (user !=null) {
        let passwordVerified  = await bcrypt.compare(password,user.password);
        if(passwordVerified)
            {
                next();
            }
            else
                {
                    res.send({ message: 'Incorrect passsword' })
                }
    }

    else {
        res.send({ message: 'User does not exist' });
    }
});