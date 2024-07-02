const express = require("express");
const userRouter = express.Router();
const { auth } = require("../middleware/authMiddleware");
const { access } = require("../middleware/accessMiddleware");
const { statusCode } = require("../utils/constants");
const { createUserSchema } = require("../utils/validate");
const { UserModel } = require("../models/userModel");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { BlackListModel } = require("../models/BlackListModel");
require('dotenv').config();
const saltRounds = 10;

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {

    const isUserExists = await UserModel.findOne({ email });

    if (!isUserExists) {
      return res.status(statusCode.BadRequest).json({ error: true, payload: 'User not found' });
    }

    const passwordCheck = await bcrypt.compare(password, isUserExists.password);
   
    if (!passwordCheck) {
      return res.status(statusCode.BadRequest).json({ error: true, payload: 'Invalid Password' });
    }

    const token = jwt.sign(
      { user_id: isUserExists._id },
      process.env.PRIVATE_KEY,
      { expiresIn: '1h' }
    );


    return res.status(statusCode.Success).json({
      error: false,
      payload: token,
    });

  } catch (err) {
    console.error('Error while logging in user:', err);
    return res.status(statusCode.BadRequest).json({ error: true, payload: 'An error occurred' });
  }
});

userRouter.post("/register", async (req, res) => {
  try {
    const { value, error } = createUserSchema.validate(req.body);
    if (error) {
      return res.status(statusCode.BadRequest).json({
        error: true,
        payload: error
      });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const user = new UserModel({ ...value, password: hashedPassword });
    await user.save();
    
    return res.status(statusCode.Success).json({
      error: false,
      payload: `${user.username} successfully created`
    });
  } catch (err) {
    console.log("Error while registering user: " + err);
    return res.status(statusCode.InternalError).json({
      error: true,
      payload: "Internal Server Error"
    });
  }
});

userRouter.patch("/:id", auth, access("user"), async (req, res) => {
  try {
    const { id } = req.params;
    let updateUserDetails;

    if (req.body?.password) {
      const user = await UserModel.findById(id);
      const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
      
      if (!isPasswordValid) {
        return res.status(statusCode.InvalidData).json({
          error: true,
          payload: 'Incorrect password'
        });
      }
      
      const hashedNewPassword = await bcrypt.hash(req.body.newPassword, saltRounds);
      req.body.password = hashedNewPassword;
      delete req.body.newPassword;
    }

    updateUserDetails = await UserModel.findByIdAndUpdate(id, { ...req.body }, { new: true });
    
    return res.status(statusCode.Created).json({
      error: false,
      payload: updateUserDetails
    });
  } catch (err) {
    console.log("Error while updating user: " + err);
    return res.status(statusCode.InternalError).json({
      error: true,
      payload: "Internal Server Error"
    });
  }
});


userRouter.post("/logout", auth, async (req, res) => {
  try {
    const user = UserModel.findOne(req.id);
    const token = req.headers.authorization.split(" ")[1];
    const blackToken = new BlackListModel({token,user_id : user._id})
    await blackToken.save();
    res.status(statusCode.Success).json({
      error  :false,
      payload : `${user.username} your are logged out, bye..`
    })

  } catch (error) {
    console.log("error while logout user: " + error);
    res.status(statusCode.InternalError).json({
      error: true,
      payload: "Internal Server Error",
    });
  }
});

userRouter.get("/", auth, access("admin"), async (req, res) => {
  try {
    const conditions = {};
    
    const users = await UserModel.find(conditions);
    res.status(statusCode.Success).json({
      error : false,
      payload : users
    })
  } catch (error) {
    console.log("error while getting all user: " + error);
    res.status(statusCode.InternalError).json({
      error: true,
      payload: "Internal Server Error",
    });
  }
});

userRouter.get("/:id", auth, access("admin"), async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    res.status(statusCode.Success).json({error : false, payload : user})
  } catch (error) {
    console.log("error while getting single user: " + error);
    res.status(statusCode.InternalError).json({
      error: true,
      payload: "Internal Server Error",
    });
  }
});

userRouter.delete("/:id", auth, access("admin", "user"), async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id)

    res.status(statusCode.Success).json({
      error : false,
      payload : `${user.username} your account has been deleted`
    })
  } catch (error) {
    console.log("error while deleting user: " + error);
    res.status(statusCode.InternalError).json({
      error: true,
      payload: "Internal Server Error",
    });
  }
});

module.exports = {
  userRouter,
};
