const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");
const userAuth = require("../middlewares/userAuth");


const { userRegister , userLogin, serializeUser, updateProfile } = require("../controllers/user");

router.post("/signup",  upload.single('profilePic'), async (req, res) => {
  await userRegister(req, res);
});

router.post("/login", async (req, res) => {
  await userLogin(req, res);
});

// Profile Route
router.get("/profile", userAuth, async (req, res) => {
  await serializeUser(req , res);
});

router.put("/profile/:userId", userAuth, upload.single('profilePic'), async(req, res ) => {
  await updateProfile(req, res )
})

module.exports = router;