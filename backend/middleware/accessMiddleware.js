const { statusCode } = require("../utils/constants");

const access = (...roles) => {
  return (req,res,next) => {
  if (roles.includes(req.role)) {
    return next();
  } else {
    return res.status(statusCode.Unauthorized).json({ error : true, payload: "your are not authorized" });
  }
}
};

module.exports = {
  access
}