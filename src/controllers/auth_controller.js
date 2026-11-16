import Database from "../db/database.js";
import UserAuth from '../models/user_auth.js';
import extractTokenFromHeader from '../utils/extract_token.js';

class AuthController{

    userExist(email)
    {
        let all_users = Database.users;
        return all_users.find((element) => element.email == email);
    }

    createNewUser(email, password)
    {
        let all_users = Database.users;
        let user = new UserAuth(email, password);
        all_users.push(user);
        Database.users = all_users;
        return all_users.find((element) => element.email == email);
    }

    signout(header){

        let token = extractTokenFromHeader(header);
        let tokens = Database.tokens;
        let updatedTokens = tokens.filter((t) => t !== token);
        Database.tokens = updatedTokens;
    }

}

export default AuthController;