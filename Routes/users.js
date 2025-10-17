const express =require("express")

const {register,getUsers, getUserById, getMyProfile} =require("../controllers/users");

const auth = require("../middleware/auth");

const router =express.Router();
router.post('/register',register);
router.get('/getusers',getUsers);
router.get('/:id', auth, getUserById);
router.get("/me", auth, getMyProfile);




module.exports=router;