import UserProfileController from '../controllers/user_profile_controller.js';
import express from "express";
const router = express.Router();
import verifyToken from '../middlewares/verify_token_middleware.js';

router.use(verifyToken);

router.get("/", (req, res) => {

  let userProfileController  = new UserProfileController(); 
  let userProfile = userProfileController.getProfile(req.headers['authorization']);
  
  res.send({userProfile: userProfile});
});

router.post("/set", async (req, res) => {
  
  let userProfileController  = new UserProfileController(); 
  let newProfile = userProfileController.setProfile(req.headers['authorization'],req.body);

  res.send({userProfile:newProfile});
});

router.put("/update", async (req, res) => {
  
  let userProfileController  = new UserProfileController(); 
  let updatedProfile = userProfileController.updateProfile(req.headers['authorization'],req.body);

  res.send({userProfile: updatedProfile});
});

export default router;
