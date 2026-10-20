import Database from "../db/database.js";

class AuthController{

    userExist(email)
    {
        let all_users = Database.users;
        return all_users.find((element) => element.email == email);
    }

}

export default AuthController;