const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.json({ message: "All field required." });
    }
    const isUserExist = await UserModel.findOne({email});
    if (isUserExist) {
      res.json({ message: "email exist please login." });
    }
    bcrypt.hash(password, 5, async (err, hash) => {
        if(err){
            res.json({message: "error while bcrypting password."})
        }
        const newUser = await UserModel.create({name, email, password: hash})
        const {password, ...rest} = newUser._doc;

        const token = jwt.sign({ newUser: rest }, 'token123', { expiresIn: "1d" });
        return res.cookie("accessToken", token).json({ message: "User Account Created successfully.", user: rest, token });
    });
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
    bcrypt.compare(password, isUserExist.password, async (err, result)=>{
        if(err){
            console.log("err while comparing password", err)
            res.json({message: "err while comparing password", err})
        }
        const {password, ...rest} = isUserExist._doc;
        const token = jwt.sign({user: rest}, "token123", { expiresIn: "1d" })
        return res.cookie("accessToken", token).json({ message: "You are login successfully.", user: rest, token });
    })
  } catch (error) {
    console.log("error while login up", error);
    res.json({ message: "error while login up" });
  }
};

module.exports = { userRegister, userLogin };