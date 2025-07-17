const jwt = require("jsonwebtoken");

const Auth = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    // console.log(accessToken)
    if (!accessToken) {
      return res.json({ message: "token Expired, Login again" });
    }
    const decoded = jwt.verify(accessToken, "token123");
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.json({ message: "error while auth", success: false });
  }
};

module.exports = Auth;