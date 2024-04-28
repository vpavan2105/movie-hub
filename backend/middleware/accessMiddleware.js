const access = (...roles) => {
  return (req,res,next) => {
  if (roles.includes(req.role)) {
    return next();
  } else {
    return res.status(404).json({ message: "your are not accessible" });
  }
}
};

module.exports = {
  access
}