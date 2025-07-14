const jwt = require("jsonwebtoken");

const Auth = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      res.json({ message: "token Expired, Login again" });
    }
    const decoded = jwt.verify(accessToken, "token123");
    req.user = decoded.user;
    next();
  } catch (error) {
    res.json({ message: "error while auth", error });
    console.log("error while auth", error);
  }
};

module.exports = Auth;
