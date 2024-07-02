require("dotenv").config();
const jwt = require("jsonwebtoken");
const { statusCode } = require("../utils/constants");
const { UserModel } = require("../models/userModel");

const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(statusCode.Unauthorized);

  jwt.verify(token, process.env.PRIVATE_KEY, async (err, user) => {
    console.log("user: ", user);
    if (err)
      return res
        .send(statusCode.InternalError)
        .json({ error: true, payload: "Failed to authenticate token " });

    const currentTime = Math.floor(Date.now() / 1000);

    if (currentTime > user.exp) {
      return res.status(statusCode.Unauthorized).json({
        error: true,
        payload: "Token Expired",
      });
    }

    const userRole = await UserModel.findById(user.user_id);
    req.id = user.user_id;
    req.role = userRole.role;

    next();
  });
};
module.exports = {
  auth,
};
