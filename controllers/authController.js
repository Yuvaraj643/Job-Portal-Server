import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      next("Name is Required");
    }
    if (!email) {
      next("Email is Required");
    }
    if (!password) {
      next("Password is Required");
    }

    // check stored data
    const existingUser = await userModel.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Email is already taken",
      });
    }
    // store the data
    const newUser = {
      name: name,
      email: email,
      password: bcrypt.hashSync(password),
    };

    console.log("new user..", newUser);
    const user = userModel.create(newUser);
    res.status(200).send({
      success: true,
      message: "User registered Successfully",
      user,
    });
  } catch (err) {
    next("Error in registry Controller");
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "Please provide email and password" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, error: "Incorrect password" });
    }

    const token = jwt.sign({ userId: user._id }, "SecretKey");

    res
      .status(200)
      .json({ success: true, message: "Login successfully", token, user });
  } catch (err) {
    next(err);
  }
};

export const authenticateController = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    jwt.verify(token, "SecretKey", (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Invalid Token",
        });
      }

      req.userId = decoded.userId;
      next();
    });
  } catch (err) {
    next("Error in Authenticate Controller");
  }
};
