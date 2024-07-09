const express = require("express");
const userRouter = express.Router();
const { auth } = require("../middleware/authMiddleware");
const { access } = require("../middleware/accessMiddleware");
const { userLogin, userRegister, userUpdate, userLogout, userList, userProfile, userSingle, userDelete } = require("../controllers/userController");
const errorHandler = require("../middleware/errorHandler");



userRouter.post("/login", userLogin);

userRouter.post("/register", userRegister);

userRouter.patch("/:id", auth, access("user"), userUpdate);


userRouter.post("/logout", auth, userLogout);

userRouter.get("/", auth, access("admin"), userList);

userRouter.get('/profile',auth,access("user"), userProfile);

userRouter.get("/:id", auth, access("admin"), userSingle);

userRouter.delete("/:id", auth, access("admin", "user"), userDelete);
userRouter.use(errorHandler)
module.exports = {
  userRouter,
};
