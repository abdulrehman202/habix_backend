import Database from "../db/database.js";
import UserProfile from '../models/user_profile.js';
import extractEmailFromToken from '../utils/extract_email_from_token.js';
import extractToken from '../utils/extract_token.js';


class UserProfileController{

    setProfile = async (req, res) =>
    {
        let token = extractToken(req.headers['authorization']);
        let email = extractEmailFromToken(token);
        const { name, dateOfBirth, weight, height, gender } = req.body;
        var userProfile = new UserProfile(email, name, dateOfBirth, weight, height, gender);
        Database.userProfiles.push(userProfile);
        res.send({ userProfile: userProfile });
    }

    updateProfile= async (req, res) =>
    {
        let token = extractToken(req.headers['authorization']);
        let email = extractEmailFromToken(token);
        const { name, dateOfBirth, weight, height, gender } = req.body;
        let all_userProfiles = Database.userProfiles;
        let userProfile = new UserProfile(email, name, dateOfBirth, weight, height, gender);
        let index = all_userProfiles.findIndex((element) => element.email == email);
        all_userProfiles[index] = userProfile;
        Database.userProfiles = all_userProfiles;
        res.send({userProfile: userProfile});
    }

    getProfile = async (req, res) =>
    {
        let token = extractToken(req.headers['authorization']);
        let email = extractEmailFromToken(token);
        let all_userProfiles = Database.userProfiles;
        let profile = all_userProfiles.find((element) => element.email == email);
        res.send({userProfile: profile});
    }

}

export default new UserProfileController();