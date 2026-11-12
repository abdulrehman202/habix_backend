import Database from "../db/database.js";
import UserProfile from '../models/user_profile.js';
import extractEmailFromToken from '../utils/extract_email_from_token.js';
import extractToken from '../utils/extract_token.js';


class UserProfileController{

    setProfile(header, data)
    {
        let token = extractToken(header);
        let email = extractEmailFromToken(token);
        const {  name, dateOfBirth, weight, height, gender } = data;

        var userProfile = new UserProfile(email, name, dateOfBirth, weight, height, gender);
        Database.userProfiles.push(userProfile);
        return userProfile;
    }

    updateProfile(header, data)
    {
        let token = extractToken(header);
        let email = extractEmailFromToken(token);
        const { name, dateOfBirth, weight, height, gender } = data;
        let all_userProfiles = Database.userProfiles;
        let userProfile = new UserProfile(email, name, dateOfBirth, weight, height, gender);
        let index = all_userProfiles.findIndex((element) => element.email == email);
        all_userProfiles[index] = userProfile;
        Database.userProfiles = all_userProfiles;
        return all_userProfiles.find((element) => element.email == email);
    }

    getProfile(header)
    {
        let token = extractToken(header);
        let email = extractEmailFromToken(token);
        let all_userProfiles = Database.userProfiles;
        return all_userProfiles.find((element) => element.email == email);
    }

}

export default UserProfileController;