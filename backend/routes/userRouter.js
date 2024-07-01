const express = require("express");
const userRouter = express.Router();
const { auth } = require("../middleware/authMiddleware");
const { access } = require("../middleware/accessMiddleware");
const { statusCode } = require("../utils/constants");
const { createUserSchema } = require("../utils/validate");
const { UserModel } = require("../models/userModel");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const saltRounds = 10;

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Retrieve the user from the database
    const isUserExists = await UserModel.findOne({ email });
    
    // Check if the user exists
    if (!isUserExists) {
      return res.status(statusCode.BadRequest).json({ error: true, payload: 'User not found' });
    }

    const passwordCheck = await bcrypt.compare(password, isUserExists.password);
   
    if (!passwordCheck) {
      return res.status(statusCode.BadRequest).json({ error: true, payload: 'Invalid Password' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { user_id: isUserExists._id },
      process.env.PRIVATE_KEY,
      { expiresIn: '1h' }
    );

    // Return the token in the response
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
    const {value, error} = createUserSchema.validate(req.body);
    if(error) {
        return res.status(statusCode.BadRequest).json({
            error : true,
            payload : error
        })
    }
    bcrypt.hash(req.body.password, saltRounds, async (err, result) => {
        if(err) throw new Error(err)
       
        const user = new UserModel({...value,password:result});
        await user.save()
        return res.status(statusCode.Success).json({
            error : false,
            payload : `${user.username} successfully created`
        })
    })
  } catch (error) {
    console.log("error while registering user: " + error);
    res.status(statusCode.InternalError).json({
      error: true,
      payload: "Internal Server Error",
    });
  }
});
userRouter.patch("/:id", auth, access("user"), async (req, res) => {
  try {
  } catch (error) {
    console.log("error while updating user: " + error);
    res.status(statusCode.InternalError).json({
      error: true,
      payload: "Internal Server Error",
    });
  }
});

userRouter.post("/logout", auth, async (req, res) => {
  try {
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
