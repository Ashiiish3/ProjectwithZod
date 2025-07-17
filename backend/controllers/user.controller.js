const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.json({ message: "All field required.", success:false });
    }
    const isUserExist = await UserModel.findOne({email});
    if (isUserExist) {
      return res.json({ message: "email exist please login.", success:false });
    }
    const hash = await bcrypt.hash(password, 5)
    if(!hash){
      return res.json({message: "error while bcrypting password.", success: false})
    }
    const newUser = await UserModel.create({name, email, password: hash})
    const {password: pwd, ...rest} = newUser._doc;
    const token = jwt.sign({ user: rest }, 'token123', { expiresIn: "2h" });
    return res.cookie("accessToken", token, {maxAge: 120*60*1000, httpOnly: false, secure: true, sameSite: "None"}).json({ message: "User Account Created successfully.", user: rest, token, success:true });
  } catch (error) {
    console.log("error while signing up", error);
    res.json({ message: "error while singning up" });
  }
};

const userLogin = async (req, res) => {
  try {
    const {email, password} = req.body;
    if(!email || !password){
        res.json({message: "All field required."})
    }
    const isUserExist = await UserModel.findOne({email})
    if(!isUserExist){
        res.json({message: "Plese create Account first."})
    }
    const result = await bcrypt.compare(password, isUserExist.password)
    if(!result){
        return res.json({message: "Invalid Credentials.", success: false})
    }
    const {password: pwd, ...rest} = isUserExist._doc;
    const token = jwt.sign({user: rest}, "token123", { expiresIn: "2h" })
    return res.cookie("accessToken", token, {maxAge: 120*60*1000, httpOnly: false, secure: true, sameSite: "None"}).json({ message: "You are login successfully.", user: rest, token });
    
  } catch (error) {
    console.log("error while login up", error);
    res.json({ message: "error while login up", error });
  }
};

module.exports = { userRegister, userLogin };